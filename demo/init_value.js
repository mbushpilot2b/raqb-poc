export default 
{
  "type": "group",
  "id": "9a99988a-0123-4456-b89a-b1607f326fd8",
  "children1": [
    {
      "type": "rule_group",
      "properties": {
        "conjunction": "AND",
        "field": "results"
      },
      "children1": [
        {
          "type": "rule",
          "properties": {
            "field": "results.score",
            "operator": "greater",
            "value": [
              8
            ],
            "valueSrc": [
              "value"
            ],
            "valueType": [
              "number"
            ],
            "valueError": [
              null
            ]
          },
          "id": "88b9bb89-4567-489a-bcde-f1702cd53266"
        }
      ],
      "id": "aaab8999-cdef-4012-b456-71702cd50090"
    },
    {
      "type": "rule_group",
      "id": "999a8a88-0123-4456-b89a-b186bebfe4dc",
      "properties": {
        "conjunction": "AND",
        "not": false,
        "field": "results"
      },
      "children1": [
        {
          "type": "rule",
          "id": "9a8ba8ba-cdef-4012-b456-7186bebfeb13",
          "properties": {
            "field": "results.product",
            "operator": "select_equals",
            "value": [
              "def"
            ],
            "valueSrc": [
              "value"
            ],
            "valueError": [
              null
            ],
            "valueType": [
              "select"
            ]
          }
        }
      ]
    }
  ],
  "properties": {
    "conjunction": "OR",
    "not": false
  }
}