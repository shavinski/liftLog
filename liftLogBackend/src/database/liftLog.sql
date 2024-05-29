\echo 'Delete and recreate lift_log_api db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lift_log_api;
CREATE DATABASE lift_log_api;
\connect lift_log_api

\i src/database/liftLog-schema.sql
\i src/database/liftLog-seed.sql

\echo 'Delete and recreate lift_log_api_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lift_log_api_test;
CREATE DATABASE lift_log_api_test;
\connect lift_log_api_test

\i src/database/liftLog-schema.sql