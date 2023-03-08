import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Utils,
  //types:
  ImmutableTree,
  Config,
  JsonTree,
  JsonLogicTree,
  ActionMeta,
  Actions
} from "@react-awesome-query-builder/core";
import {
  Query,
  Builder,
  //types:
  BuilderProps
} from "@react-awesome-query-builder/ui";
import ImportSkinStyles from "../skins";
import throttle from "lodash/throttle";
import loadConfig from "./config";
import loadedInitValue from "./init_value";
import loadedInitLogic from "./init_logic";
import Immutable from "immutable";
import clone from "clone";

const stringify = JSON.stringify;
const {
  elasticSearchFormat,
  queryBuilderFormat,
  jsonLogicFormat,
  queryString,
  _mongodbFormat,
  _sqlFormat,
  _spelFormat,
  getTree,
  checkTree,
  loadTree,
  uuid,
  loadFromJsonLogic,
  loadFromSpel,
  isValidTree
} = Utils;
const preStyle = {
  backgroundColor: "darkgrey",
  margin: "10px",
  padding: "10px"
};
const preErrorStyle = {
  backgroundColor: "lightpink",
  margin: "10px",
  padding: "10px"
};

const emptyInitValue: JsonTree = { id: uuid(), type: "group" };
const loadedConfig = loadConfig();
let initValue: JsonTree =
  loadedInitValue && Object.keys(loadedInitValue).length > 0
    ? (loadedInitValue as JsonTree)
    : emptyInitValue;
const initLogic: JsonLogicTree =
  loadedInitLogic && Object.keys(loadedInitLogic).length > 0
    ? (loadedInitLogic as JsonLogicTree)
    : undefined;
let initTree: ImmutableTree;
initTree = checkTree(loadTree(initValue), loadedConfig);
// initTree = checkTree(loadFromJsonLogic(initLogic, loadedConfig), loadedConfig); // <- this will work same

// Trick to hot-load new config when you edit `config.tsx`
const updateEvent = new CustomEvent<CustomEventDetail>("update", {
  detail: {
    config: loadedConfig,
    _initTree: initTree,
    _initValue: initValue
  }
});
window.dispatchEvent(updateEvent);

interface CustomEventDetail {
  config: Config;
  _initTree: ImmutableTree;
  _initValue: JsonTree;
}

interface DemoQueryBuilderState {
  tree: ImmutableTree;
  config: Config;
  spelStr: string;
  spelErrors: Array<string>;
}

type ImmOMap = Immutable.OrderedMap<string, any>;

interface DemoQueryBuilderMemo {
  immutableTree?: ImmutableTree;
  config?: Config;
  _actions?: Actions;
}

const DemoQueryBuilder: React.FC = () => {
  const memo: React.MutableRefObject<DemoQueryBuilderMemo> = useRef({});

  const [state, setState] = useState<DemoQueryBuilderState>({
    tree: initTree,
    config: loadedConfig,
    spelStr: "",
    spelErrors: [] as Array<string>
  });

  useEffect(() => {
    window.addEventListener("update", onConfigChanged);
    return () => {
      window.removeEventListener("update", onConfigChanged);
    };
  });

  const onConfigChanged = (e: Event) => {
    const {
      detail: { config, _initTree, _initValue }
    } = e as CustomEvent<CustomEventDetail>;
    console.log("Updating config...");
    setState({
      ...state,
      config
    });
    initTree = _initTree;
    initValue = _initValue;
  };

  const switchShowLock = () => {
    const newConfig: Config = clone(state.config);
    newConfig.settings.showLock = !newConfig.settings.showLock;
    setState({ ...state, config: newConfig });
  };

  const resetValue = () => {
    setState({
      ...state,
      tree: initTree
    });
  };

  const validate = () => {
    setState({
      ...state,
      tree: checkTree(state.tree, state.config)
    });
  };

  const onChangeSpelStr = (e: React.ChangeEvent<HTMLInputElement>) => {
    const spelStr = e.target.value;
    setState({
      ...state,
      spelStr
    });
  };

  const importFromSpel = () => {
    const [tree, spelErrors] = loadFromSpel(state.spelStr, state.config);
    setState({
      ...state,
      tree: tree ? checkTree(tree, state.config) : state.tree,
      spelErrors
    });
  };

  const clearValue = () => {
    setState({
      ...state,
      tree: loadTree(emptyInitValue)
    });
  };

  const renderBuilder = useCallback((bprops: BuilderProps) => {
    memo.current._actions = bprops.actions;
    return (
      <div className="query-builder-container" style={{ padding: "10px" }}>
        <div className="query-builder qb-lite">
          <Builder {...bprops} />
        </div>
      </div>
    );
  }, []);

  const onChange = useCallback(
    (immutableTree: ImmutableTree, config: Config, actionMeta?: ActionMeta) => {
      if (actionMeta) console.info(actionMeta);
      memo.current.immutableTree = immutableTree;
      memo.current.config = config;
      updateResult();
    },
    []
  );

  const updateResult = throttle(() => {
    setState((prevState) => ({
      ...prevState,
      tree: memo.current.immutableTree,
      config: memo.current.config
    }));
  }, 100);

  const renderResult = ({
    tree: immutableTree,
    config
  }: {
    tree: ImmutableTree;
    config: Config;
  }) => {
    const isValid = isValidTree(immutableTree);
    const treeJs = getTree(immutableTree);
    const { logic, data: logicData, errors: logicErrors } = jsonLogicFormat(
      immutableTree,
      config
    );
    const [spel, spelErrors] = _spelFormat(immutableTree, config);
    const queryStr = queryString(immutableTree, config);
    const humanQueryStr = queryString(immutableTree, config, true);
    const [sql, sqlErrors] = _sqlFormat(immutableTree, config);
    const [mongo, mongoErrors] = _mongodbFormat(immutableTree, config);
    const elasticSearch = elasticSearchFormat(immutableTree, config);

    return (
      <div>
        {isValid ? null : <pre style={preErrorStyle}>{"Tree has errors"}</pre>}
        <br />
        <div>
          elasticSearchFormat:
          <pre style={preStyle}>{stringify(elasticSearch, undefined, 2)}</pre>
        </div>
        <hr />
        <div>
          spelFormat:
          {spelErrors.length > 0 && (
            <pre style={preErrorStyle}>
              {stringify(spelErrors, undefined, 2)}
            </pre>
          )}
          <pre style={preStyle}>{stringify(spel, undefined, 2)}</pre>
        </div>
        <hr />
        <div>
          stringFormat:
          <pre style={preStyle}>{stringify(queryStr, undefined, 2)}</pre>
        </div>
        <hr />
        <div>
          humanStringFormat:
          <pre style={preStyle}>{stringify(humanQueryStr, undefined, 2)}</pre>
        </div>
        <hr />
        <div>
          sqlFormat:
          {sqlErrors.length > 0 && (
            <pre style={preErrorStyle}>
              {stringify(sqlErrors, undefined, 2)}
            </pre>
          )}
          <pre style={preStyle}>{stringify(sql, undefined, 2)}</pre>
        </div>
        <hr />
        <div>
          <a
            href="http://jsonlogic.com/play.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            jsonLogicFormat
          </a>
          :
          {logicErrors.length > 0 && (
            <pre style={preErrorStyle}>
              {stringify(logicErrors, undefined, 2)}
            </pre>
          )}
          {!!logic && (
            <pre style={preStyle}>
              {"// Rule"}:<br />
              {stringify(logic, undefined, 2)}
              <br />
              <hr />
              {"// Data"}:<br />
              {stringify(logicData, undefined, 2)}
            </pre>
          )}
        </div>
        <hr />
        <div>
          mongodbFormat:
          {mongoErrors.length > 0 && (
            <pre style={preErrorStyle}>
              {stringify(mongoErrors, undefined, 2)}
            </pre>
          )}
          <pre style={preStyle}>{stringify(mongo, undefined, 2)}</pre>
        </div>
        <hr />
        <div>
          Tree:
          <pre style={preStyle}>{stringify(treeJs, undefined, 2)}</pre>
        </div>
        <hr/>
      <div>
        queryBuilderFormat: 
          <pre style={preStyle}>
            {stringify(queryBuilderFormat(immutableTree, config), undefined, 2)}
          </pre>
      </div>
      </div>
    );
  };

  return (
    <div>
      <div>
        <button onClick={resetValue}>reset</button>
        <button onClick={clearValue}>clear</button>
        <button onClick={validate}>validate</button>
        <button onClick={switchShowLock}>
          show lock: {state.config.settings.showLock ? "on" : "off"}
        </button>
      </div>

      <ImportSkinStyles />

      <Query
        {...state.config}
        value={state.tree}
        onChange={onChange}
        renderBuilder={renderBuilder}
      />

      <div className="query-builder-result">{renderResult(state)}</div>
    </div>
  );
};

export default DemoQueryBuilder;
