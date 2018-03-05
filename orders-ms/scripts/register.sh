#!/bin/bash
curl -i -k -H "Content-Type: application/json" -H "Authorization: Basic $1" -X POST $2 -d '{ "name": "Orders Service", "description": "Order service self-registration", "version": "1.0", "implementation": { "executions": { "request": [ "1" ], "response": [ "2" ] }, "policies": [ { "id": "1", "type": "o:BackendRequest", "version": "1.0", "config": { "endpoints": [ { "name" : "endpoint 1", "useProxy": false, "url": "'$3'" } ] } }, { "id": "2", "type": "o:BackendResponse", "version": "1.0", "config": {} } ] } }'