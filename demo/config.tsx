import React, { Component } from "react";
import merge from "lodash/merge";
import {
  BasicFuncs,
  Utils,
  // types:
  Operators,
  Widgets,
  Fields,
  Config,
  Types,
  Conjunctions,
  LocaleSettings,
  OperatorProximity,
  Funcs
  //DateTimeFieldSettings,
} from "@react-awesome-query-builder/core";
import { operators as OP } from "@react-awesome-query-builder/core";
import {
  BasicConfig,
  // types:
  Settings,
  DateTimeFieldSettings
} from "@react-awesome-query-builder/ui";
import moment from "moment";
import ru_RU from "antd/es/locale/ru_RU";
import en_US from "antd/es/locale/en_US";
import { ruRU } from "@material-ui/core/locale";
import { ruRU as muiRuRU } from "@mui/material/locale";

import { AntdConfig, AntdWidgets } from "@react-awesome-query-builder/antd";
import { MuiConfig } from "@react-awesome-query-builder/mui";
import { MaterialConfig } from "@react-awesome-query-builder/material";
import { BootstrapConfig } from "@react-awesome-query-builder/bootstrap";
import { FluentUIConfig } from "@react-awesome-query-builder/fluent";
const {
  FieldSelect,
  FieldDropdown,
  FieldCascader,
  FieldTreeSelect
} = AntdWidgets;
const { simulateAsyncFetch } = Utils.Autocomplete;

const skinToConfig: Record<string, Config> = {
  vanilla: BasicConfig,
  antd: AntdConfig,
  material: MaterialConfig,
  mui: MuiConfig,
  bootstrap: BootstrapConfig,
  fluent: FluentUIConfig
};

export default (skin: string) => {
  const InitialConfig = skinToConfig[skin] as BasicConfig;

  const demoListValues = [
    { title: "A", value: "a" },
    { title: "AA", value: "aa" },
    { title: "AAA1", value: "aaa1" },
    { title: "AAA2", value: "aaa2" },
    { title: "B", value: "b" },
    { title: "C", value: "c" },
    { title: "D", value: "d" },
    { title: "E", value: "e" },
    { title: "F", value: "f" },
    { title: "G", value: "g" },
    { title: "H", value: "h" },
    { title: "I", value: "i" },
    { title: "J", value: "j" }
  ];
  const simulatedAsyncFetch = simulateAsyncFetch(demoListValues, 3);

  const conjunctions: Conjunctions = {
    ...InitialConfig.conjunctions
  };

  const proximity: OperatorProximity = {
    ...InitialConfig.operators.proximity,
    valueLabels: [
      { label: "Word 1", placeholder: "Enter first word" },
      { label: "Word 2", placeholder: "Enter second word" }
    ],
    textSeparators: [
      //'Word 1',
      //'Word 2'
    ],
    options: {
      ...InitialConfig.operators.proximity.options,
      optionLabel: "Nearrrrr", // label on top of "near" selectbox (for config.settings.showLabels==true)
      optionTextBefore: "Near", // label before "near" selectbox (for config.settings.showLabels==false)
      optionPlaceholder: "Select words between", // placeholder for "near" selectbox
      minProximity: 2,
      maxProximity: 10,
      defaults: {
        proximity: 2
      },
      customProps: {}
    }
  };

  // Semantic Health Overrides
  const containsLike: any = {
    ...InitialConfig.operators.like,
    elasticSearchQueryType: "wildcard"
  };

  const operators: Operators = {
    ...InitialConfig.operators,
    // examples of  overriding
    proximity,
    between: {
      ...InitialConfig.operators.between,
      valueLabels: ["Value from", "Value to"],
      textSeparators: ["from", "to"]
    }
  };

  const widgets: Widgets = {
    ...InitialConfig.widgets,
    // examples of  overriding
    text: {
      ...InitialConfig.widgets.text
    },
    textarea: {
      ...InitialConfig.widgets.textarea,
      maxRows: 3
    },
    slider: {
      ...InitialConfig.widgets.slider
    },
    rangeslider: {
      ...InitialConfig.widgets.rangeslider
    },
    date: {
      ...InitialConfig.widgets.date,
      dateFormat: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD"
    },
    time: {
      ...InitialConfig.widgets.time,
      timeFormat: "HH:mm",
      valueFormat: "HH:mm:ss"
    },
    datetime: {
      ...InitialConfig.widgets.datetime,
      timeFormat: "HH:mm",
      dateFormat: "DD.MM.YYYY",
      valueFormat: "YYYY-MM-DD HH:mm:ss"
    },
    func: {
      ...InitialConfig.widgets.func,
      customProps: {
        showSearch: true
      }
    },
    select: {
      ...InitialConfig.widgets.select
    },
    multiselect: {
      ...InitialConfig.widgets.multiselect,
      customProps: {
        //showCheckboxes: false,
        width: "200px",
        input: {
          width: "100px"
        }
      }
    },
    treeselect: {
      ...InitialConfig.widgets.treeselect,
      customProps: {
        showSearch: true
      }
    }
  };

  const types: Types = {
    ...InitialConfig.types,
    // examples of  overriding
    text: {
      ...InitialConfig.types.text,
      excludeOperators: ["proximity"]
    },
    boolean: merge(InitialConfig.types.boolean, {
      widgets: {
        boolean: {
          widgetProps: {
            hideOperator: true,
            operatorInlineLabel: "is"
          },
          opProps: {
            equal: {
              label: "is"
            },
            not_equal: {
              label: "is not"
            }
          }
        }
      },
    }),
    booleanSelect: merge(InitialConfig.types.select, {
      widgets: {
        select: {
          widgetProps: {
            hideOperator: true,
            operatorInlineLabel: "is"
          },
          opProps: {
            equal: {
              label: "is"
            },
            not_equal: {
              label: "is not"
            }
          }
        }
      },
    }),
    dateVerbose: merge(InitialConfig.types.dateVerbose, {
      widgets: {
        date: {
          opProps: {
            greater: {
              label: "after"
            },
            less: {
              label: "before"
            }
          }
        }
      },
    })
  };

  const localeSettings: LocaleSettings = {
    locale: {
      moment: "en",
      antd: en_US,
      material: ruRU,
      mui: muiRuRU
    },
    valueLabel: "Value",
    valuePlaceholder: "Value",
    fieldLabel: "Field",
    operatorLabel: "Operator",
    funcLabel: "Function",
    fieldPlaceholder: "Select field",
    funcPlaceholder: "Select function",
    operatorPlaceholder: "Select operator",
    lockLabel: "Lock",
    lockedLabel: "Locked",
    deleteLabel: null,
    addGroupLabel: "Add group",
    addRuleLabel: "Add rule",
    addSubRuleLabel: "Add sub rule",
    delGroupLabel: null,
    notLabel: "Not",
    valueSourcesPopupTitle: "Select value source",
    removeRuleConfirmOptions: {
      title: "Are you sure delete this rule?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel"
    },
    removeGroupConfirmOptions: {
      title: "Are you sure delete this group?",
      okText: "Yes",
      okType: "danger",
      cancelText: "Cancel"
    }
  };

  const settings: Settings = {
    ...InitialConfig.settings,
    ...localeSettings,

    defaultSliderWidth: "200px",
    defaultSelectWidth: "200px",
    defaultSearchWidth: "100px",
    defaultMaxRows: 5,

    valueSourcesInfo: {
      value: {
        label: "Value"
      },
      field: {
        label: "Field",
        widget: "field"
      },
      func: {
        label: "Function",
        widget: "func"
      }
    },
    // canReorder: true,
    // canRegroup: true,
    // showLock: true,
    // showNot: true,
    // showLabels: true,
    maxNesting: 5,
    canLeaveEmptyGroup: true,
    shouldCreateEmptyGroup: false,
    showErrorMessage: true,
    customFieldSelectProps: {
      showSearch: true
    }
    // renderField: (props) => <FieldCascader {...props} />,
    // renderOperator: (props) => <FieldDropdown {...props} />,
    // renderFunc: (props) => <FieldSelect {...props} />,
    // maxNumberOfRules: 10 // number of rules can be added to the query builder
  };

  //////////////////////////////////////////////////////////////////////

  const fields: Fields = {
    user: {
      label: "User",
      tooltip: "Group of fields",
      type: "!struct",
      subfields: {
        firstName: {
          label2: "Username", //only for menu's toggler
          type: "text",
          fieldSettings: {
            validateValue: (val: string, fieldSettings) => {
              return val.length < 10;
            }
          },
          mainWidgetProps: {
            valueLabel: "Name",
            valuePlaceholder: "Enter name"
          }
        },
        login: {
          type: "text",
          tableName: "t1", // legacy: PR #18, PR #20
          fieldSettings: {
            validateValue: (val: string, fieldSettings) => {
              return (
                val.length < 10 &&
                (val === "" || val.match(/^[A-Za-z0-9_-]+$/) !== null)
              );
            }
          },
          mainWidgetProps: {
            valueLabel: "Login",
            valuePlaceholder: "Enter login"
          }
        }
      }
    },
    masterRef: {
      label: "Semantic Master ID",
      type: "number"
    },
    auditScore: {
      label: "Audit Score",
      type: "number",
      preferWidgets: ["slider", "rangeslider"],
      valueSources: ["value", "field"],
      fieldSettings: {
        min: 0,
        max: 100,
        step: 1,
        marks: {
          0: <strong>0%</strong>,
          100: <strong>100%</strong>
        }
      }
    },
    auditScoreRationale: {
      label: "Audit Score Rationale",
      type: "text"
    },
    registerNumber: {
      label: "Register Number",
      type: "number"
    },
    chartNumber: {
      label: "Chart Number",
      type: "number"
    },
    coderNumber: {
      label: "Coder Number",
      type: "number"
    },
    inCCIS: {
      label: "In CCIS",
      type: "boolean",
      defaultValue: true,
      mainWidgetProps: {
        labelYes: "+",
        labelNo: "-"
      }
    },
    inCCIS2: {
      label: "In CCIS-2",
      type: "booleanSelect",
      valueSources: ["value"],
      fieldSettings: {
        showSearch: true,
        listValues: [
          { value: "true", title: "True" },
          { value: "false", title: "False" }
        ]
      },
    },
    notes: {
      label: "Clinical Notes",
      type: "!group",
      subfields: {
        noteType: {
          label: "Note Type",
          type: "text",
          preferWidgets: ["textarea"],
          fieldSettings: {
            maxLength: 1000
          }
        },
        noteText: {
          label: "Note Text",
          type: "text",
          preferWidgets: ["textarea"],
          fieldSettings: {
            maxLength: 1000
          }
        },
        noteAuthor: {
          label: "Note Author",
          type: "text",
          preferWidgets: ["textarea"],
          fieldSettings: {
            maxLength: 1000
          }
        },
        noteDate: {
          label: "Note Date",
          type: "datetime"
        },
        noteTextForCount: {
          label: "Note Text for Count",
          type: "text",
          preferWidgets: ["textarea"],
          fieldSettings: {
            maxLength: 1000
          }
        }
      }
    },
    admissionDate: {
      label: "Admission Date",
      type: "dateVerbose"
    },
    dischargeDate: {
      label: "Discharge Date",
      type: "date",
      fieldSettings: {
        dateFormat: "DD-MM-YYYY"
      }
    },
    gender: {
      label: "Gender",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        showSearch: true,
        listValues: [
          { value: "m", title: "Male" },
          { value: "f", title: "Female" }
        ]
      }
    },
    prox1: {
      label: "prox",
      tooltip: "Proximity search",
      type: "text",
      operators: ["proximity"]
    },
    slider: {
      label: "Slider",
      type: "number",
      preferWidgets: ["slider", "rangeslider"],
      valueSources: ["value", "field"],
      fieldSettings: {
        min: 0,
        max: 100,
        step: 1,
        marks: {
          0: <strong>0%</strong>,
          100: <strong>100%</strong>
        },
        validateValue: (val, fieldSettings) => {
          return val < 50 ? null : "Invalid slider value, see validateValue()";
        }
      },
      //overrides
      widgets: {
        slider: {
          widgetProps: {
            valuePlaceholder: "..Slider"
          }
        },
        rangeslider: {
          widgetProps: {
            valueLabels: [
              { label: "Number from", placeholder: "from" },
              { label: "Number to", placeholder: "to" }
            ]
          }
        }
      }
    },
    selecttree: {
      label: "Color (tree)",
      type: "treeselect",
      fieldSettings: {
        treeExpandAll: true,
        // * deep format (will be auto converted to flat format):
        // listValues: [
        //     { value: "1", title: "Warm colors", children: [
        //         { value: "2", title: "Red" },
        //         { value: "3", title: "Orange" }
        //     ] },
        //     { value: "4", title: "Cool colors", children: [
        //         { value: "5", title: "Green" },
        //         { value: "6", title: "Blue", children: [
        //             { value: "7", title: "Sub blue", children: [
        //                 { value: "8", title: "Sub sub blue and a long text" }
        //             ] }
        //         ] }
        //     ] }
        // ],
        // * flat format:
        listValues: [
          { value: "1", title: "Warm colors" },
          { value: "2", title: "Red", parent: "1" },
          { value: "3", title: "Orange", parent: "1" },
          { value: "4", title: "Cool colors" },
          { value: "5", title: "Green", parent: "4" },
          { value: "6", title: "Blue", parent: "4" },
          { value: "7", title: "Sub blue", parent: "6" },
          { value: "8", title: "Sub sub blue and a long text", parent: "7" }
        ]
      }
    },
    multiselecttree: {
      label: "Colors (tree)",
      type: "treemultiselect",
      fieldSettings: {
        treeExpandAll: true,
        listValues: [
          {
            value: "1",
            title: "Warm colors",
            children: [
              { value: "2", title: "Red" },
              { value: "3", title: "Orange" }
            ]
          },
          {
            value: "4",
            title: "Cool colors",
            children: [
              { value: "5", title: "Green" },
              {
                value: "6",
                title: "Blue",
                children: [
                  {
                    value: "7",
                    title: "Sub blue",
                    children: [
                      { value: "8", title: "Sub sub blue and a long text" }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    autocomplete: {
      label: "Autocomplete",
      type: "select",
      valueSources: ["value"],
      fieldSettings: {
        asyncFetch: simulatedAsyncFetch,
        useAsyncSearch: true,
        useLoadMore: true,
        forceAsyncSearch: false,
        allowCustomValues: false
      }
    },
    autocompleteMultiple: {
      label: "AutocompleteMultiple",
      type: "multiselect",
      valueSources: ["value"],
      fieldSettings: {
        asyncFetch: simulatedAsyncFetch,
        useAsyncSearch: true,
        useLoadMore: true,
        forceAsyncSearch: false,
        allowCustomValues: false
      }
    }
    /* Subfields
    cars: {
      label: "Cars",
      type: "!group",
      mode: "array",
      conjunctions: ["AND", "OR"],
      showNot: true,
      operators: [
        // w/ operand - count
        "equal",
        "not_equal",
        "less",
        "less_or_equal",
        "greater",
        "greater_or_equal",
        "between",
        "not_between",

        // w/o operand
        "some",
        "all",
        "none"
      ],
      defaultOperator: "some",
      initialEmptyWhere: true, // if default operator is not in config.settings.groupOperators, true - to set no children, false - to add 1 empty

      subfields: {
        vendor: {
          type: "select",
          fieldSettings: {
            listValues: ["Ford", "Toyota", "Tesla"]
          },
          valueSources: ["value"]
        },
        year: {
          type: "number",
          fieldSettings: {
            min: 1990,
            max: 2021
          },
          valueSources: ["value"]
        }
      }
    },
    */
  };

  //////////////////////////////////////////////////////////////////////

  const funcs: Funcs = {
    ...BasicFuncs
  };

  const config: Config = {
    conjunctions,
    operators,
    widgets,
    types,
    settings,
    fields,
    funcs
  };

  return config;
};
