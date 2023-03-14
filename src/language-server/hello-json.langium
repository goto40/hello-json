grammar HelloJson

entry Model:
    (includes+=JsonInclude
    | jsonReferences+=JsonReference
    )*;

JsonInclude:
    'include-json' filename=STRING 'as' name=ID;

JsonReference:
    'reference' include=[JsonInclude]
    ':' jsonLink=FQN
;

FQN returns string: ID ('.'FQN)*;
hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
