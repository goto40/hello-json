grammar HelloGrammar

entry Model:
    (persons+=Person | greetings+=Greeting)*;

Person:
    'person' name=ID;

GreetingType returns string: 'Hello'|'Hi';

Greeting:
    helloType=GreetingType greeting=SpecialGreeting '!';
//                         ^^^^^^^^^can we get rid of this????

SpecialGreeting: SpecialGreetingMr|SpecialGreetingMrs;

SpecialGreetingMr:
    'Mr.' person=[Person:ID];

SpecialGreetingMrs:
    'Mrs.' person=[Person:ID];

hidden terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"(\\.|[^"\\])*"|'(\\.|[^'\\])*'/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
