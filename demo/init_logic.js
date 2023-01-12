export default {
  and: [
    {
      "==": [
        {
          var: "auditScoreRationale"
        },
        "multiple"
      ]
    },
    {
      "==": [
        {
          var: "inCCIS"
        },
        true
      ]
    },
    {
      "==": [
        {
          var: "registerNumber"
        },
        "3007592"
      ]
    },
    {
      "==": [
        {
          var: "admissionDate"
        }
      ]
    },
    {
      "==": [
        {
          var: "auditScore"
        },
        3
      ]
    },
    {
      some: [
        {
          var: "notes"
        },
        {
          and: [
            {
              "==": [
                {
                  var: "noteType"
                },
                "abc"
              ]
            },
            {
              "==": [
                {
                  var: "noteText"
                },
                "asdf"
              ]
            }
          ]
        }
      ]
    },
    {
      ">": [
        {
          reduce: [
            {
              filter: [
                {
                  var: "cars"
                },
                {
                  and: [
                    {
                      "==": [
                        {
                          var: "vendor"
                        },
                        "Toyota"
                      ]
                    },
                    {
                      ">=": [
                        {
                          var: "year"
                        },
                        2010
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "+": [
                1,
                {
                  var: "accumulator"
                }
              ]
            },
            0
          ]
        },
        2
      ]
    }
  ]
};
