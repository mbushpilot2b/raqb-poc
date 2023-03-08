export default {
  "or": [
    {
      "some": [
        {
          "var": "results"
        },
        {
          ">": [
            {
              "var": "score"
            },
            8
          ]
        }
      ]
    },
    {
      "some": [
        {
          "var": "results"
        },
        {
          "==": [
            {
              "var": "product"
            },
            "def"
          ]
        }
      ]
    }
  ]
}


