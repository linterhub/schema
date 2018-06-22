# Collection

Collections

## Structure

The schema with references to external data sets

|Key|Type|Required|Description|
|-|:-:|:-:|-|
| language | [language](#language)[] | - | Programming languages and associated extensions |
| license | string[] | - | Software licenses names and acronyms |
| manager | string[] | - | System and language package managers |

### Language

|Key|Type|Required|Description|
|-|:-:|:-:|-|
| enum | string[] | + | An Array names of language |
| extensions | string[] | - | An Array of associated extensions for that language |

## Example

```json
{
    "definitions":{
        "language":{
            "oneOf":[
                {
                    "enum":[
                        "string",
                    ],
                    "extensions":[
                        "string",
                    ]
                },
            ]
        },
        "license": {
            "oneOf":[
                "string",
            ]
        },
        "manager": {
            "oneOf":[
                "string",
            ]
        }
    }
}
```
