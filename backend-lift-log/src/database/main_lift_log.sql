-- FOR SETTING UP PROD DATABASE
-- Run this with: psql -f src/database/main_lift_log.sql lift_log_api in the /liftLog/liftLogBackend directory

-- FOR SETTING UP TEST DATABASE
-- Run this with: psql -f src/database/main_lift_log.sql lift_log_api_test in the /liftLog/liftLogBackend directory

\echo 'Delete and recreate lift_log_api db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lift_log_api;
CREATE DATABASE lift_log_api;
\connect lift_log_api

-- Include and execute the following sql scripts for production env
\i src/database/lift_log_schema.sql
\i src/database/users_data.sql
\i src/database/exercises_data.sql

\echo 'Delete and recreate lift_log_api_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lift_log_api_test;
CREATE DATABASE lift_log_api_test;
\connect lift_log_api_test

-- Include and execute the following sql scripts for test env
\i src/database/lift_log_schema.sql
\i src/database/users_data.sql
\i src/database/exercises_data.sql