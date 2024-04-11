
-- ------------------------------
-- TRANSACTION
-- ------------------------------

BEGIN TRANSACTION;

-- ------------------------------
-- TABLE DATA: contains
-- ------------------------------

RELATE income:baher -> contains:pkt9uob59gyxntwmlpvx -> node:baher1 CONTENT {"id":"contains:pkt9uob59gyxntwmlpvx","in":"income:baher","out":"node:baher1"};

-- ------------------------------
-- TABLE DATA: has
-- ------------------------------

RELATE user:zl5s6sw769v1jjnxzi57 -> has:9oe6w944q1r8fqxrxld9 -> income:8pepopk7ges2cuxypc1a CONTENT {"id":"has:9oe6w944q1r8fqxrxld9","in":"user:zl5s6sw769v1jjnxzi57","out":"income:8pepopk7ges2cuxypc1a"};
RELATE user:baher -> has:kjp7sykh7tqxhs4zgzeq -> income:baher CONTENT {"id":"has:kjp7sykh7tqxhs4zgzeq","in":"user:baher","out":"income:baher"};

-- ------------------------------
-- TABLE DATA: node
-- ------------------------------

UPDATE node:baher1 CONTENT {"amount":"100","id":"node:baher1","interval":10,"name":"sad","startDate":"2022-07-03T07:18:52Z","total":"1000"};

-- ------------------------------
-- TABLE DATA: user
-- ------------------------------

UPDATE user:baher CONTENT {"email":"baher","id":"user:baher","password":"sad","username":"baher"};

-- ------------------------------
-- TRANSACTION
-- ------------------------------

COMMIT TRANSACTION;