#!/usr/bin/env bash
echo "Creating mongo users..."
mongosh --authenticationDatabase admin --host localhost --port 27017 -u "${MONGO_INITDB_ROOT_USERNAME}" -p "${MONGO_INITDB_ROOT_PASSWORD}" ida --eval 'db.createUser({user: "'"${IDA_DB_USER}"'", pwd: "'"${IDA_DB_PASS}"'", roles: [{role: "readWrite", db: "ida"}]});'
mongosh ida --host localhost --port 27017 -u "${MONGO_INITDB_ROOT_USERNAME}" -p "${MONGO_INITDB_ROOT_PASSWORD}" --authenticationDatabase admin --eval "db.createCollection('ida_items');db['ida_items'].createIndex({'location': '2dsphere'});db.createCollection('ida_users');db.createCollection('ida_schools');db['ida_schools'].createIndex({'location': '2dsphere'});"
echo "Mongo users created."