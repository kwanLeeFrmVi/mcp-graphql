#!/usr/bin/env node
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/graphql/version.js
var require_version = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.versionInfo = exports.version = undefined;
  var version = "16.11.0";
  exports.version = version;
  var versionInfo = Object.freeze({
    major: 16,
    minor: 11,
    patch: 0,
    preReleaseTag: null
  });
  exports.versionInfo = versionInfo;
});

// node_modules/graphql/jsutils/devAssert.js
var require_devAssert = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.devAssert = devAssert2;
  function devAssert2(condition, message) {
    const booleanCondition = Boolean(condition);
    if (!booleanCondition) {
      throw new Error(message);
    }
  }
});

// node_modules/graphql/jsutils/isPromise.js
var require_isPromise = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isPromise = isPromise;
  function isPromise(value) {
    return typeof (value === null || value === undefined ? undefined : value.then) === "function";
  }
});

// node_modules/graphql/jsutils/isObjectLike.js
var require_isObjectLike = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isObjectLike = isObjectLike2;
  function isObjectLike2(value) {
    return typeof value == "object" && value !== null;
  }
});

// node_modules/graphql/jsutils/invariant.js
var require_invariant = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invariant = invariant2;
  function invariant2(condition, message) {
    const booleanCondition = Boolean(condition);
    if (!booleanCondition) {
      throw new Error(message != null ? message : "Unexpected invariant triggered.");
    }
  }
});

// node_modules/graphql/language/location.js
var require_location = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getLocation = getLocation2;
  var _invariant = require_invariant();
  var LineRegExp2 = /\r\n|[\n\r]/g;
  function getLocation2(source, position) {
    let lastLineStart = 0;
    let line = 1;
    for (const match of source.body.matchAll(LineRegExp2)) {
      typeof match.index === "number" || (0, _invariant.invariant)(false);
      if (match.index >= position) {
        break;
      }
      lastLineStart = match.index + match[0].length;
      line += 1;
    }
    return {
      line,
      column: position + 1 - lastLineStart
    };
  }
});

// node_modules/graphql/language/printLocation.js
var require_printLocation = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.printLocation = printLocation2;
  exports.printSourceLocation = printSourceLocation2;
  var _location = require_location();
  function printLocation2(location) {
    return printSourceLocation2(location.source, (0, _location.getLocation)(location.source, location.start));
  }
  function printSourceLocation2(source, sourceLocation) {
    const firstLineColumnOffset = source.locationOffset.column - 1;
    const body = "".padStart(firstLineColumnOffset) + source.body;
    const lineIndex = sourceLocation.line - 1;
    const lineOffset = source.locationOffset.line - 1;
    const lineNum = sourceLocation.line + lineOffset;
    const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
    const columnNum = sourceLocation.column + columnOffset;
    const locationStr = `${source.name}:${lineNum}:${columnNum}
`;
    const lines = body.split(/\r\n|[\n\r]/g);
    const locationLine = lines[lineIndex];
    if (locationLine.length > 120) {
      const subLineIndex = Math.floor(columnNum / 80);
      const subLineColumnNum = columnNum % 80;
      const subLines = [];
      for (let i = 0;i < locationLine.length; i += 80) {
        subLines.push(locationLine.slice(i, i + 80));
      }
      return locationStr + printPrefixedLines2([
        [`${lineNum} |`, subLines[0]],
        ...subLines.slice(1, subLineIndex + 1).map((subLine) => ["|", subLine]),
        ["|", "^".padStart(subLineColumnNum)],
        ["|", subLines[subLineIndex + 1]]
      ]);
    }
    return locationStr + printPrefixedLines2([
      [`${lineNum - 1} |`, lines[lineIndex - 1]],
      [`${lineNum} |`, locationLine],
      ["|", "^".padStart(columnNum)],
      [`${lineNum + 1} |`, lines[lineIndex + 1]]
    ]);
  }
  function printPrefixedLines2(lines) {
    const existingLines = lines.filter(([_, line]) => line !== undefined);
    const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
    return existingLines.map(([prefix, line]) => prefix.padStart(padLen) + (line ? " " + line : "")).join(`
`);
  }
});

// node_modules/graphql/error/GraphQLError.js
var require_GraphQLError = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GraphQLError = undefined;
  exports.formatError = formatError;
  exports.printError = printError;
  var _isObjectLike = require_isObjectLike();
  var _location = require_location();
  var _printLocation = require_printLocation();
  function toNormalizedOptions2(args) {
    const firstArg = args[0];
    if (firstArg == null || "kind" in firstArg || "length" in firstArg) {
      return {
        nodes: firstArg,
        source: args[1],
        positions: args[2],
        path: args[3],
        originalError: args[4],
        extensions: args[5]
      };
    }
    return firstArg;
  }

  class GraphQLError2 extends Error {
    constructor(message, ...rawArgs) {
      var _this$nodes, _nodeLocations$, _ref;
      const { nodes, source, positions, path, originalError, extensions } = toNormalizedOptions2(rawArgs);
      super(message);
      this.name = "GraphQLError";
      this.path = path !== null && path !== undefined ? path : undefined;
      this.originalError = originalError !== null && originalError !== undefined ? originalError : undefined;
      this.nodes = undefinedIfEmpty2(Array.isArray(nodes) ? nodes : nodes ? [nodes] : undefined);
      const nodeLocations = undefinedIfEmpty2((_this$nodes = this.nodes) === null || _this$nodes === undefined ? undefined : _this$nodes.map((node) => node.loc).filter((loc) => loc != null));
      this.source = source !== null && source !== undefined ? source : nodeLocations === null || nodeLocations === undefined ? undefined : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === undefined ? undefined : _nodeLocations$.source;
      this.positions = positions !== null && positions !== undefined ? positions : nodeLocations === null || nodeLocations === undefined ? undefined : nodeLocations.map((loc) => loc.start);
      this.locations = positions && source ? positions.map((pos) => (0, _location.getLocation)(source, pos)) : nodeLocations === null || nodeLocations === undefined ? undefined : nodeLocations.map((loc) => (0, _location.getLocation)(loc.source, loc.start));
      const originalExtensions = (0, _isObjectLike.isObjectLike)(originalError === null || originalError === undefined ? undefined : originalError.extensions) ? originalError === null || originalError === undefined ? undefined : originalError.extensions : undefined;
      this.extensions = (_ref = extensions !== null && extensions !== undefined ? extensions : originalExtensions) !== null && _ref !== undefined ? _ref : Object.create(null);
      Object.defineProperties(this, {
        message: {
          writable: true,
          enumerable: true
        },
        name: {
          enumerable: false
        },
        nodes: {
          enumerable: false
        },
        source: {
          enumerable: false
        },
        positions: {
          enumerable: false
        },
        originalError: {
          enumerable: false
        }
      });
      if (originalError !== null && originalError !== undefined && originalError.stack) {
        Object.defineProperty(this, "stack", {
          value: originalError.stack,
          writable: true,
          configurable: true
        });
      } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, GraphQLError2);
      } else {
        Object.defineProperty(this, "stack", {
          value: Error().stack,
          writable: true,
          configurable: true
        });
      }
    }
    get [Symbol.toStringTag]() {
      return "GraphQLError";
    }
    toString() {
      let output = this.message;
      if (this.nodes) {
        for (const node of this.nodes) {
          if (node.loc) {
            output += `

` + (0, _printLocation.printLocation)(node.loc);
          }
        }
      } else if (this.source && this.locations) {
        for (const location of this.locations) {
          output += `

` + (0, _printLocation.printSourceLocation)(this.source, location);
        }
      }
      return output;
    }
    toJSON() {
      const formattedError = {
        message: this.message
      };
      if (this.locations != null) {
        formattedError.locations = this.locations;
      }
      if (this.path != null) {
        formattedError.path = this.path;
      }
      if (this.extensions != null && Object.keys(this.extensions).length > 0) {
        formattedError.extensions = this.extensions;
      }
      return formattedError;
    }
  }
  exports.GraphQLError = GraphQLError2;
  function undefinedIfEmpty2(array2) {
    return array2 === undefined || array2.length === 0 ? undefined : array2;
  }
  function printError(error) {
    return error.toString();
  }
  function formatError(error) {
    return error.toJSON();
  }
});

// node_modules/graphql/error/syntaxError.js
var require_syntaxError = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.syntaxError = syntaxError2;
  var _GraphQLError = require_GraphQLError();
  function syntaxError2(source, position, description) {
    return new _GraphQLError.GraphQLError(`Syntax Error: ${description}`, {
      source,
      positions: [position]
    });
  }
});

// node_modules/graphql/language/ast.js
var require_ast = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Token = exports.QueryDocumentKeys = exports.OperationTypeNode = exports.Location = undefined;
  exports.isNode = isNode;

  class Location2 {
    constructor(startToken, endToken, source) {
      this.start = startToken.start;
      this.end = endToken.end;
      this.startToken = startToken;
      this.endToken = endToken;
      this.source = source;
    }
    get [Symbol.toStringTag]() {
      return "Location";
    }
    toJSON() {
      return {
        start: this.start,
        end: this.end
      };
    }
  }
  exports.Location = Location2;

  class Token2 {
    constructor(kind, start, end, line, column, value) {
      this.kind = kind;
      this.start = start;
      this.end = end;
      this.line = line;
      this.column = column;
      this.value = value;
      this.prev = null;
      this.next = null;
    }
    get [Symbol.toStringTag]() {
      return "Token";
    }
    toJSON() {
      return {
        kind: this.kind,
        value: this.value,
        line: this.line,
        column: this.column
      };
    }
  }
  exports.Token = Token2;
  var QueryDocumentKeys2 = {
    Name: [],
    Document: ["definitions"],
    OperationDefinition: [
      "name",
      "variableDefinitions",
      "directives",
      "selectionSet"
    ],
    VariableDefinition: ["variable", "type", "defaultValue", "directives"],
    Variable: ["name"],
    SelectionSet: ["selections"],
    Field: ["alias", "name", "arguments", "directives", "selectionSet"],
    Argument: ["name", "value"],
    FragmentSpread: ["name", "directives"],
    InlineFragment: ["typeCondition", "directives", "selectionSet"],
    FragmentDefinition: [
      "name",
      "variableDefinitions",
      "typeCondition",
      "directives",
      "selectionSet"
    ],
    IntValue: [],
    FloatValue: [],
    StringValue: [],
    BooleanValue: [],
    NullValue: [],
    EnumValue: [],
    ListValue: ["values"],
    ObjectValue: ["fields"],
    ObjectField: ["name", "value"],
    Directive: ["name", "arguments"],
    NamedType: ["name"],
    ListType: ["type"],
    NonNullType: ["type"],
    SchemaDefinition: ["description", "directives", "operationTypes"],
    OperationTypeDefinition: ["type"],
    ScalarTypeDefinition: ["description", "name", "directives"],
    ObjectTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    FieldDefinition: ["description", "name", "arguments", "type", "directives"],
    InputValueDefinition: [
      "description",
      "name",
      "type",
      "defaultValue",
      "directives"
    ],
    InterfaceTypeDefinition: [
      "description",
      "name",
      "interfaces",
      "directives",
      "fields"
    ],
    UnionTypeDefinition: ["description", "name", "directives", "types"],
    EnumTypeDefinition: ["description", "name", "directives", "values"],
    EnumValueDefinition: ["description", "name", "directives"],
    InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
    DirectiveDefinition: ["description", "name", "arguments", "locations"],
    SchemaExtension: ["directives", "operationTypes"],
    ScalarTypeExtension: ["name", "directives"],
    ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
    InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
    UnionTypeExtension: ["name", "directives", "types"],
    EnumTypeExtension: ["name", "directives", "values"],
    InputObjectTypeExtension: ["name", "directives", "fields"]
  };
  exports.QueryDocumentKeys = QueryDocumentKeys2;
  var kindValues2 = new Set(Object.keys(QueryDocumentKeys2));
  function isNode(maybeNode) {
    const maybeKind = maybeNode === null || maybeNode === undefined ? undefined : maybeNode.kind;
    return typeof maybeKind === "string" && kindValues2.has(maybeKind);
  }
  var OperationTypeNode2;
  exports.OperationTypeNode = OperationTypeNode2;
  (function(OperationTypeNode3) {
    OperationTypeNode3["QUERY"] = "query";
    OperationTypeNode3["MUTATION"] = "mutation";
    OperationTypeNode3["SUBSCRIPTION"] = "subscription";
  })(OperationTypeNode2 || (exports.OperationTypeNode = OperationTypeNode2 = {}));
});

// node_modules/graphql/language/directiveLocation.js
var require_directiveLocation = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DirectiveLocation = undefined;
  var DirectiveLocation2;
  exports.DirectiveLocation = DirectiveLocation2;
  (function(DirectiveLocation3) {
    DirectiveLocation3["QUERY"] = "QUERY";
    DirectiveLocation3["MUTATION"] = "MUTATION";
    DirectiveLocation3["SUBSCRIPTION"] = "SUBSCRIPTION";
    DirectiveLocation3["FIELD"] = "FIELD";
    DirectiveLocation3["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
    DirectiveLocation3["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
    DirectiveLocation3["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
    DirectiveLocation3["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
    DirectiveLocation3["SCHEMA"] = "SCHEMA";
    DirectiveLocation3["SCALAR"] = "SCALAR";
    DirectiveLocation3["OBJECT"] = "OBJECT";
    DirectiveLocation3["FIELD_DEFINITION"] = "FIELD_DEFINITION";
    DirectiveLocation3["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
    DirectiveLocation3["INTERFACE"] = "INTERFACE";
    DirectiveLocation3["UNION"] = "UNION";
    DirectiveLocation3["ENUM"] = "ENUM";
    DirectiveLocation3["ENUM_VALUE"] = "ENUM_VALUE";
    DirectiveLocation3["INPUT_OBJECT"] = "INPUT_OBJECT";
    DirectiveLocation3["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
  })(DirectiveLocation2 || (exports.DirectiveLocation = DirectiveLocation2 = {}));
});

// node_modules/graphql/language/kinds.js
var require_kinds = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Kind = undefined;
  var Kind2;
  exports.Kind = Kind2;
  (function(Kind3) {
    Kind3["NAME"] = "Name";
    Kind3["DOCUMENT"] = "Document";
    Kind3["OPERATION_DEFINITION"] = "OperationDefinition";
    Kind3["VARIABLE_DEFINITION"] = "VariableDefinition";
    Kind3["SELECTION_SET"] = "SelectionSet";
    Kind3["FIELD"] = "Field";
    Kind3["ARGUMENT"] = "Argument";
    Kind3["FRAGMENT_SPREAD"] = "FragmentSpread";
    Kind3["INLINE_FRAGMENT"] = "InlineFragment";
    Kind3["FRAGMENT_DEFINITION"] = "FragmentDefinition";
    Kind3["VARIABLE"] = "Variable";
    Kind3["INT"] = "IntValue";
    Kind3["FLOAT"] = "FloatValue";
    Kind3["STRING"] = "StringValue";
    Kind3["BOOLEAN"] = "BooleanValue";
    Kind3["NULL"] = "NullValue";
    Kind3["ENUM"] = "EnumValue";
    Kind3["LIST"] = "ListValue";
    Kind3["OBJECT"] = "ObjectValue";
    Kind3["OBJECT_FIELD"] = "ObjectField";
    Kind3["DIRECTIVE"] = "Directive";
    Kind3["NAMED_TYPE"] = "NamedType";
    Kind3["LIST_TYPE"] = "ListType";
    Kind3["NON_NULL_TYPE"] = "NonNullType";
    Kind3["SCHEMA_DEFINITION"] = "SchemaDefinition";
    Kind3["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
    Kind3["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
    Kind3["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
    Kind3["FIELD_DEFINITION"] = "FieldDefinition";
    Kind3["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
    Kind3["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
    Kind3["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
    Kind3["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
    Kind3["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
    Kind3["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
    Kind3["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
    Kind3["SCHEMA_EXTENSION"] = "SchemaExtension";
    Kind3["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
    Kind3["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
    Kind3["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
    Kind3["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
    Kind3["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
    Kind3["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
  })(Kind2 || (exports.Kind = Kind2 = {}));
});

// node_modules/graphql/language/characterClasses.js
var require_characterClasses = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isDigit = isDigit2;
  exports.isLetter = isLetter2;
  exports.isNameContinue = isNameContinue2;
  exports.isNameStart = isNameStart2;
  exports.isWhiteSpace = isWhiteSpace2;
  function isWhiteSpace2(code) {
    return code === 9 || code === 32;
  }
  function isDigit2(code) {
    return code >= 48 && code <= 57;
  }
  function isLetter2(code) {
    return code >= 97 && code <= 122 || code >= 65 && code <= 90;
  }
  function isNameStart2(code) {
    return isLetter2(code) || code === 95;
  }
  function isNameContinue2(code) {
    return isLetter2(code) || isDigit2(code) || code === 95;
  }
});

// node_modules/graphql/language/blockString.js
var require_blockString = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.dedentBlockStringLines = dedentBlockStringLines2;
  exports.isPrintableAsBlockString = isPrintableAsBlockString;
  exports.printBlockString = printBlockString;
  var _characterClasses = require_characterClasses();
  function dedentBlockStringLines2(lines) {
    var _firstNonEmptyLine2;
    let commonIndent = Number.MAX_SAFE_INTEGER;
    let firstNonEmptyLine = null;
    let lastNonEmptyLine = -1;
    for (let i = 0;i < lines.length; ++i) {
      var _firstNonEmptyLine;
      const line = lines[i];
      const indent = leadingWhitespace2(line);
      if (indent === line.length) {
        continue;
      }
      firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== undefined ? _firstNonEmptyLine : i;
      lastNonEmptyLine = i;
      if (i !== 0 && indent < commonIndent) {
        commonIndent = indent;
      }
    }
    return lines.map((line, i) => i === 0 ? line : line.slice(commonIndent)).slice((_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== undefined ? _firstNonEmptyLine2 : 0, lastNonEmptyLine + 1);
  }
  function leadingWhitespace2(str) {
    let i = 0;
    while (i < str.length && (0, _characterClasses.isWhiteSpace)(str.charCodeAt(i))) {
      ++i;
    }
    return i;
  }
  function isPrintableAsBlockString(value) {
    if (value === "") {
      return true;
    }
    let isEmptyLine = true;
    let hasIndent = false;
    let hasCommonIndent = true;
    let seenNonEmptyLine = false;
    for (let i = 0;i < value.length; ++i) {
      switch (value.codePointAt(i)) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 11:
        case 12:
        case 14:
        case 15:
          return false;
        case 13:
          return false;
        case 10:
          if (isEmptyLine && !seenNonEmptyLine) {
            return false;
          }
          seenNonEmptyLine = true;
          isEmptyLine = true;
          hasIndent = false;
          break;
        case 9:
        case 32:
          hasIndent || (hasIndent = isEmptyLine);
          break;
        default:
          hasCommonIndent && (hasCommonIndent = hasIndent);
          isEmptyLine = false;
      }
    }
    if (isEmptyLine) {
      return false;
    }
    if (hasCommonIndent && seenNonEmptyLine) {
      return false;
    }
    return true;
  }
  function printBlockString(value, options) {
    const escapedValue = value.replace(/"""/g, '\\"""');
    const lines = escapedValue.split(/\r\n|[\n\r]/g);
    const isSingleLine = lines.length === 1;
    const forceLeadingNewLine = lines.length > 1 && lines.slice(1).every((line) => line.length === 0 || (0, _characterClasses.isWhiteSpace)(line.charCodeAt(0)));
    const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""');
    const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
    const hasTrailingSlash = value.endsWith("\\");
    const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
    const printAsMultipleLines = !(options !== null && options !== undefined && options.minimize) && (!isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
    let result = "";
    const skipLeadingNewLine = isSingleLine && (0, _characterClasses.isWhiteSpace)(value.charCodeAt(0));
    if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
      result += `
`;
    }
    result += escapedValue;
    if (printAsMultipleLines || forceTrailingNewline) {
      result += `
`;
    }
    return '"""' + result + '"""';
  }
});

// node_modules/graphql/language/tokenKind.js
var require_tokenKind = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TokenKind = undefined;
  var TokenKind2;
  exports.TokenKind = TokenKind2;
  (function(TokenKind3) {
    TokenKind3["SOF"] = "<SOF>";
    TokenKind3["EOF"] = "<EOF>";
    TokenKind3["BANG"] = "!";
    TokenKind3["DOLLAR"] = "$";
    TokenKind3["AMP"] = "&";
    TokenKind3["PAREN_L"] = "(";
    TokenKind3["PAREN_R"] = ")";
    TokenKind3["SPREAD"] = "...";
    TokenKind3["COLON"] = ":";
    TokenKind3["EQUALS"] = "=";
    TokenKind3["AT"] = "@";
    TokenKind3["BRACKET_L"] = "[";
    TokenKind3["BRACKET_R"] = "]";
    TokenKind3["BRACE_L"] = "{";
    TokenKind3["PIPE"] = "|";
    TokenKind3["BRACE_R"] = "}";
    TokenKind3["NAME"] = "Name";
    TokenKind3["INT"] = "Int";
    TokenKind3["FLOAT"] = "Float";
    TokenKind3["STRING"] = "String";
    TokenKind3["BLOCK_STRING"] = "BlockString";
    TokenKind3["COMMENT"] = "Comment";
  })(TokenKind2 || (exports.TokenKind = TokenKind2 = {}));
});

// node_modules/graphql/language/lexer.js
var require_lexer = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Lexer = undefined;
  exports.isPunctuatorTokenKind = isPunctuatorTokenKind2;
  var _syntaxError = require_syntaxError();
  var _ast = require_ast();
  var _blockString = require_blockString();
  var _characterClasses = require_characterClasses();
  var _tokenKind = require_tokenKind();

  class Lexer2 {
    constructor(source) {
      const startOfFileToken = new _ast.Token(_tokenKind.TokenKind.SOF, 0, 0, 0, 0);
      this.source = source;
      this.lastToken = startOfFileToken;
      this.token = startOfFileToken;
      this.line = 1;
      this.lineStart = 0;
    }
    get [Symbol.toStringTag]() {
      return "Lexer";
    }
    advance() {
      this.lastToken = this.token;
      const token = this.token = this.lookahead();
      return token;
    }
    lookahead() {
      let token = this.token;
      if (token.kind !== _tokenKind.TokenKind.EOF) {
        do {
          if (token.next) {
            token = token.next;
          } else {
            const nextToken = readNextToken2(this, token.end);
            token.next = nextToken;
            nextToken.prev = token;
            token = nextToken;
          }
        } while (token.kind === _tokenKind.TokenKind.COMMENT);
      }
      return token;
    }
  }
  exports.Lexer = Lexer2;
  function isPunctuatorTokenKind2(kind) {
    return kind === _tokenKind.TokenKind.BANG || kind === _tokenKind.TokenKind.DOLLAR || kind === _tokenKind.TokenKind.AMP || kind === _tokenKind.TokenKind.PAREN_L || kind === _tokenKind.TokenKind.PAREN_R || kind === _tokenKind.TokenKind.SPREAD || kind === _tokenKind.TokenKind.COLON || kind === _tokenKind.TokenKind.EQUALS || kind === _tokenKind.TokenKind.AT || kind === _tokenKind.TokenKind.BRACKET_L || kind === _tokenKind.TokenKind.BRACKET_R || kind === _tokenKind.TokenKind.BRACE_L || kind === _tokenKind.TokenKind.PIPE || kind === _tokenKind.TokenKind.BRACE_R;
  }
  function isUnicodeScalarValue2(code) {
    return code >= 0 && code <= 55295 || code >= 57344 && code <= 1114111;
  }
  function isSupplementaryCodePoint2(body, location) {
    return isLeadingSurrogate2(body.charCodeAt(location)) && isTrailingSurrogate2(body.charCodeAt(location + 1));
  }
  function isLeadingSurrogate2(code) {
    return code >= 55296 && code <= 56319;
  }
  function isTrailingSurrogate2(code) {
    return code >= 56320 && code <= 57343;
  }
  function printCodePointAt2(lexer, location) {
    const code = lexer.source.body.codePointAt(location);
    if (code === undefined) {
      return _tokenKind.TokenKind.EOF;
    } else if (code >= 32 && code <= 126) {
      const char = String.fromCodePoint(code);
      return char === '"' ? `'"'` : `"${char}"`;
    }
    return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
  }
  function createToken2(lexer, kind, start, end, value) {
    const line = lexer.line;
    const col = 1 + start - lexer.lineStart;
    return new _ast.Token(kind, start, end, line, col, value);
  }
  function readNextToken2(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start;
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      switch (code) {
        case 65279:
        case 9:
        case 32:
        case 44:
          ++position;
          continue;
        case 10:
          ++position;
          ++lexer.line;
          lexer.lineStart = position;
          continue;
        case 13:
          if (body.charCodeAt(position + 1) === 10) {
            position += 2;
          } else {
            ++position;
          }
          ++lexer.line;
          lexer.lineStart = position;
          continue;
        case 35:
          return readComment2(lexer, position);
        case 33:
          return createToken2(lexer, _tokenKind.TokenKind.BANG, position, position + 1);
        case 36:
          return createToken2(lexer, _tokenKind.TokenKind.DOLLAR, position, position + 1);
        case 38:
          return createToken2(lexer, _tokenKind.TokenKind.AMP, position, position + 1);
        case 40:
          return createToken2(lexer, _tokenKind.TokenKind.PAREN_L, position, position + 1);
        case 41:
          return createToken2(lexer, _tokenKind.TokenKind.PAREN_R, position, position + 1);
        case 46:
          if (body.charCodeAt(position + 1) === 46 && body.charCodeAt(position + 2) === 46) {
            return createToken2(lexer, _tokenKind.TokenKind.SPREAD, position, position + 3);
          }
          break;
        case 58:
          return createToken2(lexer, _tokenKind.TokenKind.COLON, position, position + 1);
        case 61:
          return createToken2(lexer, _tokenKind.TokenKind.EQUALS, position, position + 1);
        case 64:
          return createToken2(lexer, _tokenKind.TokenKind.AT, position, position + 1);
        case 91:
          return createToken2(lexer, _tokenKind.TokenKind.BRACKET_L, position, position + 1);
        case 93:
          return createToken2(lexer, _tokenKind.TokenKind.BRACKET_R, position, position + 1);
        case 123:
          return createToken2(lexer, _tokenKind.TokenKind.BRACE_L, position, position + 1);
        case 124:
          return createToken2(lexer, _tokenKind.TokenKind.PIPE, position, position + 1);
        case 125:
          return createToken2(lexer, _tokenKind.TokenKind.BRACE_R, position, position + 1);
        case 34:
          if (body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
            return readBlockString2(lexer, position);
          }
          return readString2(lexer, position);
      }
      if ((0, _characterClasses.isDigit)(code) || code === 45) {
        return readNumber2(lexer, position, code);
      }
      if ((0, _characterClasses.isNameStart)(code)) {
        return readName2(lexer, position);
      }
      throw (0, _syntaxError.syntaxError)(lexer.source, position, code === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : isUnicodeScalarValue2(code) || isSupplementaryCodePoint2(body, position) ? `Unexpected character: ${printCodePointAt2(lexer, position)}.` : `Invalid character: ${printCodePointAt2(lexer, position)}.`);
    }
    return createToken2(lexer, _tokenKind.TokenKind.EOF, bodyLength, bodyLength);
  }
  function readComment2(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start + 1;
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      if (code === 10 || code === 13) {
        break;
      }
      if (isUnicodeScalarValue2(code)) {
        ++position;
      } else if (isSupplementaryCodePoint2(body, position)) {
        position += 2;
      } else {
        break;
      }
    }
    return createToken2(lexer, _tokenKind.TokenKind.COMMENT, start, position, body.slice(start + 1, position));
  }
  function readNumber2(lexer, start, firstCode) {
    const body = lexer.source.body;
    let position = start;
    let code = firstCode;
    let isFloat = false;
    if (code === 45) {
      code = body.charCodeAt(++position);
    }
    if (code === 48) {
      code = body.charCodeAt(++position);
      if ((0, _characterClasses.isDigit)(code)) {
        throw (0, _syntaxError.syntaxError)(lexer.source, position, `Invalid number, unexpected digit after 0: ${printCodePointAt2(lexer, position)}.`);
      }
    } else {
      position = readDigits2(lexer, position, code);
      code = body.charCodeAt(position);
    }
    if (code === 46) {
      isFloat = true;
      code = body.charCodeAt(++position);
      position = readDigits2(lexer, position, code);
      code = body.charCodeAt(position);
    }
    if (code === 69 || code === 101) {
      isFloat = true;
      code = body.charCodeAt(++position);
      if (code === 43 || code === 45) {
        code = body.charCodeAt(++position);
      }
      position = readDigits2(lexer, position, code);
      code = body.charCodeAt(position);
    }
    if (code === 46 || (0, _characterClasses.isNameStart)(code)) {
      throw (0, _syntaxError.syntaxError)(lexer.source, position, `Invalid number, expected digit but got: ${printCodePointAt2(lexer, position)}.`);
    }
    return createToken2(lexer, isFloat ? _tokenKind.TokenKind.FLOAT : _tokenKind.TokenKind.INT, start, position, body.slice(start, position));
  }
  function readDigits2(lexer, start, firstCode) {
    if (!(0, _characterClasses.isDigit)(firstCode)) {
      throw (0, _syntaxError.syntaxError)(lexer.source, start, `Invalid number, expected digit but got: ${printCodePointAt2(lexer, start)}.`);
    }
    const body = lexer.source.body;
    let position = start + 1;
    while ((0, _characterClasses.isDigit)(body.charCodeAt(position))) {
      ++position;
    }
    return position;
  }
  function readString2(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start + 1;
    let chunkStart = position;
    let value = "";
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      if (code === 34) {
        value += body.slice(chunkStart, position);
        return createToken2(lexer, _tokenKind.TokenKind.STRING, start, position + 1, value);
      }
      if (code === 92) {
        value += body.slice(chunkStart, position);
        const escape = body.charCodeAt(position + 1) === 117 ? body.charCodeAt(position + 2) === 123 ? readEscapedUnicodeVariableWidth2(lexer, position) : readEscapedUnicodeFixedWidth2(lexer, position) : readEscapedCharacter2(lexer, position);
        value += escape.value;
        position += escape.size;
        chunkStart = position;
        continue;
      }
      if (code === 10 || code === 13) {
        break;
      }
      if (isUnicodeScalarValue2(code)) {
        ++position;
      } else if (isSupplementaryCodePoint2(body, position)) {
        position += 2;
      } else {
        throw (0, _syntaxError.syntaxError)(lexer.source, position, `Invalid character within String: ${printCodePointAt2(lexer, position)}.`);
      }
    }
    throw (0, _syntaxError.syntaxError)(lexer.source, position, "Unterminated string.");
  }
  function readEscapedUnicodeVariableWidth2(lexer, position) {
    const body = lexer.source.body;
    let point = 0;
    let size = 3;
    while (size < 12) {
      const code = body.charCodeAt(position + size++);
      if (code === 125) {
        if (size < 5 || !isUnicodeScalarValue2(point)) {
          break;
        }
        return {
          value: String.fromCodePoint(point),
          size
        };
      }
      point = point << 4 | readHexDigit2(code);
      if (point < 0) {
        break;
      }
    }
    throw (0, _syntaxError.syntaxError)(lexer.source, position, `Invalid Unicode escape sequence: "${body.slice(position, position + size)}".`);
  }
  function readEscapedUnicodeFixedWidth2(lexer, position) {
    const body = lexer.source.body;
    const code = read16BitHexCode2(body, position + 2);
    if (isUnicodeScalarValue2(code)) {
      return {
        value: String.fromCodePoint(code),
        size: 6
      };
    }
    if (isLeadingSurrogate2(code)) {
      if (body.charCodeAt(position + 6) === 92 && body.charCodeAt(position + 7) === 117) {
        const trailingCode = read16BitHexCode2(body, position + 8);
        if (isTrailingSurrogate2(trailingCode)) {
          return {
            value: String.fromCodePoint(code, trailingCode),
            size: 12
          };
        }
      }
    }
    throw (0, _syntaxError.syntaxError)(lexer.source, position, `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`);
  }
  function read16BitHexCode2(body, position) {
    return readHexDigit2(body.charCodeAt(position)) << 12 | readHexDigit2(body.charCodeAt(position + 1)) << 8 | readHexDigit2(body.charCodeAt(position + 2)) << 4 | readHexDigit2(body.charCodeAt(position + 3));
  }
  function readHexDigit2(code) {
    return code >= 48 && code <= 57 ? code - 48 : code >= 65 && code <= 70 ? code - 55 : code >= 97 && code <= 102 ? code - 87 : -1;
  }
  function readEscapedCharacter2(lexer, position) {
    const body = lexer.source.body;
    const code = body.charCodeAt(position + 1);
    switch (code) {
      case 34:
        return {
          value: '"',
          size: 2
        };
      case 92:
        return {
          value: "\\",
          size: 2
        };
      case 47:
        return {
          value: "/",
          size: 2
        };
      case 98:
        return {
          value: "\b",
          size: 2
        };
      case 102:
        return {
          value: "\f",
          size: 2
        };
      case 110:
        return {
          value: `
`,
          size: 2
        };
      case 114:
        return {
          value: "\r",
          size: 2
        };
      case 116:
        return {
          value: "\t",
          size: 2
        };
    }
    throw (0, _syntaxError.syntaxError)(lexer.source, position, `Invalid character escape sequence: "${body.slice(position, position + 2)}".`);
  }
  function readBlockString2(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let lineStart = lexer.lineStart;
    let position = start + 3;
    let chunkStart = position;
    let currentLine = "";
    const blockLines = [];
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
        currentLine += body.slice(chunkStart, position);
        blockLines.push(currentLine);
        const token = createToken2(lexer, _tokenKind.TokenKind.BLOCK_STRING, start, position + 3, (0, _blockString.dedentBlockStringLines)(blockLines).join(`
`));
        lexer.line += blockLines.length - 1;
        lexer.lineStart = lineStart;
        return token;
      }
      if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
        currentLine += body.slice(chunkStart, position);
        chunkStart = position + 1;
        position += 4;
        continue;
      }
      if (code === 10 || code === 13) {
        currentLine += body.slice(chunkStart, position);
        blockLines.push(currentLine);
        if (code === 13 && body.charCodeAt(position + 1) === 10) {
          position += 2;
        } else {
          ++position;
        }
        currentLine = "";
        chunkStart = position;
        lineStart = position;
        continue;
      }
      if (isUnicodeScalarValue2(code)) {
        ++position;
      } else if (isSupplementaryCodePoint2(body, position)) {
        position += 2;
      } else {
        throw (0, _syntaxError.syntaxError)(lexer.source, position, `Invalid character within String: ${printCodePointAt2(lexer, position)}.`);
      }
    }
    throw (0, _syntaxError.syntaxError)(lexer.source, position, "Unterminated string.");
  }
  function readName2(lexer, start) {
    const body = lexer.source.body;
    const bodyLength = body.length;
    let position = start + 1;
    while (position < bodyLength) {
      const code = body.charCodeAt(position);
      if ((0, _characterClasses.isNameContinue)(code)) {
        ++position;
      } else {
        break;
      }
    }
    return createToken2(lexer, _tokenKind.TokenKind.NAME, start, position, body.slice(start, position));
  }
});

// node_modules/graphql/jsutils/inspect.js
var require_inspect = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.inspect = inspect2;
  var MAX_ARRAY_LENGTH2 = 10;
  var MAX_RECURSIVE_DEPTH2 = 2;
  function inspect2(value) {
    return formatValue2(value, []);
  }
  function formatValue2(value, seenValues) {
    switch (typeof value) {
      case "string":
        return JSON.stringify(value);
      case "function":
        return value.name ? `[function ${value.name}]` : "[function]";
      case "object":
        return formatObjectValue2(value, seenValues);
      default:
        return String(value);
    }
  }
  function formatObjectValue2(value, previouslySeenValues) {
    if (value === null) {
      return "null";
    }
    if (previouslySeenValues.includes(value)) {
      return "[Circular]";
    }
    const seenValues = [...previouslySeenValues, value];
    if (isJSONable2(value)) {
      const jsonValue = value.toJSON();
      if (jsonValue !== value) {
        return typeof jsonValue === "string" ? jsonValue : formatValue2(jsonValue, seenValues);
      }
    } else if (Array.isArray(value)) {
      return formatArray2(value, seenValues);
    }
    return formatObject2(value, seenValues);
  }
  function isJSONable2(value) {
    return typeof value.toJSON === "function";
  }
  function formatObject2(object2, seenValues) {
    const entries = Object.entries(object2);
    if (entries.length === 0) {
      return "{}";
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH2) {
      return "[" + getObjectTag2(object2) + "]";
    }
    const properties = entries.map(([key, value]) => key + ": " + formatValue2(value, seenValues));
    return "{ " + properties.join(", ") + " }";
  }
  function formatArray2(array2, seenValues) {
    if (array2.length === 0) {
      return "[]";
    }
    if (seenValues.length > MAX_RECURSIVE_DEPTH2) {
      return "[Array]";
    }
    const len = Math.min(MAX_ARRAY_LENGTH2, array2.length);
    const remaining = array2.length - len;
    const items = [];
    for (let i = 0;i < len; ++i) {
      items.push(formatValue2(array2[i], seenValues));
    }
    if (remaining === 1) {
      items.push("... 1 more item");
    } else if (remaining > 1) {
      items.push(`... ${remaining} more items`);
    }
    return "[" + items.join(", ") + "]";
  }
  function getObjectTag2(object2) {
    const tag = Object.prototype.toString.call(object2).replace(/^\[object /, "").replace(/]$/, "");
    if (tag === "Object" && typeof object2.constructor === "function") {
      const name = object2.constructor.name;
      if (typeof name === "string" && name !== "") {
        return name;
      }
    }
    return tag;
  }
});

// node_modules/graphql/jsutils/instanceOf.js
var require_instanceOf = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.instanceOf = undefined;
  var _inspect = require_inspect();
  var isProduction2 = globalThis.process && false;
  var instanceOf4 = isProduction2 ? function instanceOf(value, constructor) {
    return value instanceof constructor;
  } : function instanceOf(value, constructor) {
    if (value instanceof constructor) {
      return true;
    }
    if (typeof value === "object" && value !== null) {
      var _value$constructor;
      const className = constructor.prototype[Symbol.toStringTag];
      const valueClassName = Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === undefined ? undefined : _value$constructor.name;
      if (className === valueClassName) {
        const stringifiedValue = (0, _inspect.inspect)(value);
        throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
      }
    }
    return false;
  };
  exports.instanceOf = instanceOf4;
});

// node_modules/graphql/language/source.js
var require_source = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Source = undefined;
  exports.isSource = isSource2;
  var _devAssert = require_devAssert();
  var _inspect = require_inspect();
  var _instanceOf = require_instanceOf();

  class Source2 {
    constructor(body, name = "GraphQL request", locationOffset = {
      line: 1,
      column: 1
    }) {
      typeof body === "string" || (0, _devAssert.devAssert)(false, `Body must be a string. Received: ${(0, _inspect.inspect)(body)}.`);
      this.body = body;
      this.name = name;
      this.locationOffset = locationOffset;
      this.locationOffset.line > 0 || (0, _devAssert.devAssert)(false, "line in locationOffset is 1-indexed and must be positive.");
      this.locationOffset.column > 0 || (0, _devAssert.devAssert)(false, "column in locationOffset is 1-indexed and must be positive.");
    }
    get [Symbol.toStringTag]() {
      return "Source";
    }
  }
  exports.Source = Source2;
  function isSource2(source) {
    return (0, _instanceOf.instanceOf)(source, Source2);
  }
});

// node_modules/graphql/language/parser.js
var require_parser = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Parser = undefined;
  exports.parse = parse2;
  exports.parseConstValue = parseConstValue2;
  exports.parseType = parseType2;
  exports.parseValue = parseValue2;
  var _syntaxError = require_syntaxError();
  var _ast = require_ast();
  var _directiveLocation = require_directiveLocation();
  var _kinds = require_kinds();
  var _lexer = require_lexer();
  var _source = require_source();
  var _tokenKind = require_tokenKind();
  function parse2(source, options) {
    const parser = new Parser2(source, options);
    const document = parser.parseDocument();
    Object.defineProperty(document, "tokenCount", {
      enumerable: false,
      value: parser.tokenCount
    });
    return document;
  }
  function parseValue2(source, options) {
    const parser = new Parser2(source, options);
    parser.expectToken(_tokenKind.TokenKind.SOF);
    const value = parser.parseValueLiteral(false);
    parser.expectToken(_tokenKind.TokenKind.EOF);
    return value;
  }
  function parseConstValue2(source, options) {
    const parser = new Parser2(source, options);
    parser.expectToken(_tokenKind.TokenKind.SOF);
    const value = parser.parseConstValueLiteral();
    parser.expectToken(_tokenKind.TokenKind.EOF);
    return value;
  }
  function parseType2(source, options) {
    const parser = new Parser2(source, options);
    parser.expectToken(_tokenKind.TokenKind.SOF);
    const type = parser.parseTypeReference();
    parser.expectToken(_tokenKind.TokenKind.EOF);
    return type;
  }

  class Parser2 {
    constructor(source, options = {}) {
      const sourceObj = (0, _source.isSource)(source) ? source : new _source.Source(source);
      this._lexer = new _lexer.Lexer(sourceObj);
      this._options = options;
      this._tokenCounter = 0;
    }
    get tokenCount() {
      return this._tokenCounter;
    }
    parseName() {
      const token = this.expectToken(_tokenKind.TokenKind.NAME);
      return this.node(token, {
        kind: _kinds.Kind.NAME,
        value: token.value
      });
    }
    parseDocument() {
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.DOCUMENT,
        definitions: this.many(_tokenKind.TokenKind.SOF, this.parseDefinition, _tokenKind.TokenKind.EOF)
      });
    }
    parseDefinition() {
      if (this.peek(_tokenKind.TokenKind.BRACE_L)) {
        return this.parseOperationDefinition();
      }
      const hasDescription = this.peekDescription();
      const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
      if (keywordToken.kind === _tokenKind.TokenKind.NAME) {
        switch (keywordToken.value) {
          case "schema":
            return this.parseSchemaDefinition();
          case "scalar":
            return this.parseScalarTypeDefinition();
          case "type":
            return this.parseObjectTypeDefinition();
          case "interface":
            return this.parseInterfaceTypeDefinition();
          case "union":
            return this.parseUnionTypeDefinition();
          case "enum":
            return this.parseEnumTypeDefinition();
          case "input":
            return this.parseInputObjectTypeDefinition();
          case "directive":
            return this.parseDirectiveDefinition();
        }
        if (hasDescription) {
          throw (0, _syntaxError.syntaxError)(this._lexer.source, this._lexer.token.start, "Unexpected description, descriptions are supported only on type definitions.");
        }
        switch (keywordToken.value) {
          case "query":
          case "mutation":
          case "subscription":
            return this.parseOperationDefinition();
          case "fragment":
            return this.parseFragmentDefinition();
          case "extend":
            return this.parseTypeSystemExtension();
        }
      }
      throw this.unexpected(keywordToken);
    }
    parseOperationDefinition() {
      const start = this._lexer.token;
      if (this.peek(_tokenKind.TokenKind.BRACE_L)) {
        return this.node(start, {
          kind: _kinds.Kind.OPERATION_DEFINITION,
          operation: _ast.OperationTypeNode.QUERY,
          name: undefined,
          variableDefinitions: [],
          directives: [],
          selectionSet: this.parseSelectionSet()
        });
      }
      const operation = this.parseOperationType();
      let name;
      if (this.peek(_tokenKind.TokenKind.NAME)) {
        name = this.parseName();
      }
      return this.node(start, {
        kind: _kinds.Kind.OPERATION_DEFINITION,
        operation,
        name,
        variableDefinitions: this.parseVariableDefinitions(),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    parseOperationType() {
      const operationToken = this.expectToken(_tokenKind.TokenKind.NAME);
      switch (operationToken.value) {
        case "query":
          return _ast.OperationTypeNode.QUERY;
        case "mutation":
          return _ast.OperationTypeNode.MUTATION;
        case "subscription":
          return _ast.OperationTypeNode.SUBSCRIPTION;
      }
      throw this.unexpected(operationToken);
    }
    parseVariableDefinitions() {
      return this.optionalMany(_tokenKind.TokenKind.PAREN_L, this.parseVariableDefinition, _tokenKind.TokenKind.PAREN_R);
    }
    parseVariableDefinition() {
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.VARIABLE_DEFINITION,
        variable: this.parseVariable(),
        type: (this.expectToken(_tokenKind.TokenKind.COLON), this.parseTypeReference()),
        defaultValue: this.expectOptionalToken(_tokenKind.TokenKind.EQUALS) ? this.parseConstValueLiteral() : undefined,
        directives: this.parseConstDirectives()
      });
    }
    parseVariable() {
      const start = this._lexer.token;
      this.expectToken(_tokenKind.TokenKind.DOLLAR);
      return this.node(start, {
        kind: _kinds.Kind.VARIABLE,
        name: this.parseName()
      });
    }
    parseSelectionSet() {
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.SELECTION_SET,
        selections: this.many(_tokenKind.TokenKind.BRACE_L, this.parseSelection, _tokenKind.TokenKind.BRACE_R)
      });
    }
    parseSelection() {
      return this.peek(_tokenKind.TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
    }
    parseField() {
      const start = this._lexer.token;
      const nameOrAlias = this.parseName();
      let alias;
      let name;
      if (this.expectOptionalToken(_tokenKind.TokenKind.COLON)) {
        alias = nameOrAlias;
        name = this.parseName();
      } else {
        name = nameOrAlias;
      }
      return this.node(start, {
        kind: _kinds.Kind.FIELD,
        alias,
        name,
        arguments: this.parseArguments(false),
        directives: this.parseDirectives(false),
        selectionSet: this.peek(_tokenKind.TokenKind.BRACE_L) ? this.parseSelectionSet() : undefined
      });
    }
    parseArguments(isConst) {
      const item = isConst ? this.parseConstArgument : this.parseArgument;
      return this.optionalMany(_tokenKind.TokenKind.PAREN_L, item, _tokenKind.TokenKind.PAREN_R);
    }
    parseArgument(isConst = false) {
      const start = this._lexer.token;
      const name = this.parseName();
      this.expectToken(_tokenKind.TokenKind.COLON);
      return this.node(start, {
        kind: _kinds.Kind.ARGUMENT,
        name,
        value: this.parseValueLiteral(isConst)
      });
    }
    parseConstArgument() {
      return this.parseArgument(true);
    }
    parseFragment() {
      const start = this._lexer.token;
      this.expectToken(_tokenKind.TokenKind.SPREAD);
      const hasTypeCondition = this.expectOptionalKeyword("on");
      if (!hasTypeCondition && this.peek(_tokenKind.TokenKind.NAME)) {
        return this.node(start, {
          kind: _kinds.Kind.FRAGMENT_SPREAD,
          name: this.parseFragmentName(),
          directives: this.parseDirectives(false)
        });
      }
      return this.node(start, {
        kind: _kinds.Kind.INLINE_FRAGMENT,
        typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    parseFragmentDefinition() {
      const start = this._lexer.token;
      this.expectKeyword("fragment");
      if (this._options.allowLegacyFragmentVariables === true) {
        return this.node(start, {
          kind: _kinds.Kind.FRAGMENT_DEFINITION,
          name: this.parseFragmentName(),
          variableDefinitions: this.parseVariableDefinitions(),
          typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
          directives: this.parseDirectives(false),
          selectionSet: this.parseSelectionSet()
        });
      }
      return this.node(start, {
        kind: _kinds.Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    parseFragmentName() {
      if (this._lexer.token.value === "on") {
        throw this.unexpected();
      }
      return this.parseName();
    }
    parseValueLiteral(isConst) {
      const token = this._lexer.token;
      switch (token.kind) {
        case _tokenKind.TokenKind.BRACKET_L:
          return this.parseList(isConst);
        case _tokenKind.TokenKind.BRACE_L:
          return this.parseObject(isConst);
        case _tokenKind.TokenKind.INT:
          this.advanceLexer();
          return this.node(token, {
            kind: _kinds.Kind.INT,
            value: token.value
          });
        case _tokenKind.TokenKind.FLOAT:
          this.advanceLexer();
          return this.node(token, {
            kind: _kinds.Kind.FLOAT,
            value: token.value
          });
        case _tokenKind.TokenKind.STRING:
        case _tokenKind.TokenKind.BLOCK_STRING:
          return this.parseStringLiteral();
        case _tokenKind.TokenKind.NAME:
          this.advanceLexer();
          switch (token.value) {
            case "true":
              return this.node(token, {
                kind: _kinds.Kind.BOOLEAN,
                value: true
              });
            case "false":
              return this.node(token, {
                kind: _kinds.Kind.BOOLEAN,
                value: false
              });
            case "null":
              return this.node(token, {
                kind: _kinds.Kind.NULL
              });
            default:
              return this.node(token, {
                kind: _kinds.Kind.ENUM,
                value: token.value
              });
          }
        case _tokenKind.TokenKind.DOLLAR:
          if (isConst) {
            this.expectToken(_tokenKind.TokenKind.DOLLAR);
            if (this._lexer.token.kind === _tokenKind.TokenKind.NAME) {
              const varName = this._lexer.token.value;
              throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, `Unexpected variable "$${varName}" in constant value.`);
            } else {
              throw this.unexpected(token);
            }
          }
          return this.parseVariable();
        default:
          throw this.unexpected();
      }
    }
    parseConstValueLiteral() {
      return this.parseValueLiteral(true);
    }
    parseStringLiteral() {
      const token = this._lexer.token;
      this.advanceLexer();
      return this.node(token, {
        kind: _kinds.Kind.STRING,
        value: token.value,
        block: token.kind === _tokenKind.TokenKind.BLOCK_STRING
      });
    }
    parseList(isConst) {
      const item = () => this.parseValueLiteral(isConst);
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.LIST,
        values: this.any(_tokenKind.TokenKind.BRACKET_L, item, _tokenKind.TokenKind.BRACKET_R)
      });
    }
    parseObject(isConst) {
      const item = () => this.parseObjectField(isConst);
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.OBJECT,
        fields: this.any(_tokenKind.TokenKind.BRACE_L, item, _tokenKind.TokenKind.BRACE_R)
      });
    }
    parseObjectField(isConst) {
      const start = this._lexer.token;
      const name = this.parseName();
      this.expectToken(_tokenKind.TokenKind.COLON);
      return this.node(start, {
        kind: _kinds.Kind.OBJECT_FIELD,
        name,
        value: this.parseValueLiteral(isConst)
      });
    }
    parseDirectives(isConst) {
      const directives = [];
      while (this.peek(_tokenKind.TokenKind.AT)) {
        directives.push(this.parseDirective(isConst));
      }
      return directives;
    }
    parseConstDirectives() {
      return this.parseDirectives(true);
    }
    parseDirective(isConst) {
      const start = this._lexer.token;
      this.expectToken(_tokenKind.TokenKind.AT);
      return this.node(start, {
        kind: _kinds.Kind.DIRECTIVE,
        name: this.parseName(),
        arguments: this.parseArguments(isConst)
      });
    }
    parseTypeReference() {
      const start = this._lexer.token;
      let type;
      if (this.expectOptionalToken(_tokenKind.TokenKind.BRACKET_L)) {
        const innerType = this.parseTypeReference();
        this.expectToken(_tokenKind.TokenKind.BRACKET_R);
        type = this.node(start, {
          kind: _kinds.Kind.LIST_TYPE,
          type: innerType
        });
      } else {
        type = this.parseNamedType();
      }
      if (this.expectOptionalToken(_tokenKind.TokenKind.BANG)) {
        return this.node(start, {
          kind: _kinds.Kind.NON_NULL_TYPE,
          type
        });
      }
      return type;
    }
    parseNamedType() {
      return this.node(this._lexer.token, {
        kind: _kinds.Kind.NAMED_TYPE,
        name: this.parseName()
      });
    }
    peekDescription() {
      return this.peek(_tokenKind.TokenKind.STRING) || this.peek(_tokenKind.TokenKind.BLOCK_STRING);
    }
    parseDescription() {
      if (this.peekDescription()) {
        return this.parseStringLiteral();
      }
    }
    parseSchemaDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("schema");
      const directives = this.parseConstDirectives();
      const operationTypes = this.many(_tokenKind.TokenKind.BRACE_L, this.parseOperationTypeDefinition, _tokenKind.TokenKind.BRACE_R);
      return this.node(start, {
        kind: _kinds.Kind.SCHEMA_DEFINITION,
        description,
        directives,
        operationTypes
      });
    }
    parseOperationTypeDefinition() {
      const start = this._lexer.token;
      const operation = this.parseOperationType();
      this.expectToken(_tokenKind.TokenKind.COLON);
      const type = this.parseNamedType();
      return this.node(start, {
        kind: _kinds.Kind.OPERATION_TYPE_DEFINITION,
        operation,
        type
      });
    }
    parseScalarTypeDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("scalar");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      return this.node(start, {
        kind: _kinds.Kind.SCALAR_TYPE_DEFINITION,
        description,
        name,
        directives
      });
    }
    parseObjectTypeDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("type");
      const name = this.parseName();
      const interfaces = this.parseImplementsInterfaces();
      const directives = this.parseConstDirectives();
      const fields = this.parseFieldsDefinition();
      return this.node(start, {
        kind: _kinds.Kind.OBJECT_TYPE_DEFINITION,
        description,
        name,
        interfaces,
        directives,
        fields
      });
    }
    parseImplementsInterfaces() {
      return this.expectOptionalKeyword("implements") ? this.delimitedMany(_tokenKind.TokenKind.AMP, this.parseNamedType) : [];
    }
    parseFieldsDefinition() {
      return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseFieldDefinition, _tokenKind.TokenKind.BRACE_R);
    }
    parseFieldDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      const name = this.parseName();
      const args = this.parseArgumentDefs();
      this.expectToken(_tokenKind.TokenKind.COLON);
      const type = this.parseTypeReference();
      const directives = this.parseConstDirectives();
      return this.node(start, {
        kind: _kinds.Kind.FIELD_DEFINITION,
        description,
        name,
        arguments: args,
        type,
        directives
      });
    }
    parseArgumentDefs() {
      return this.optionalMany(_tokenKind.TokenKind.PAREN_L, this.parseInputValueDef, _tokenKind.TokenKind.PAREN_R);
    }
    parseInputValueDef() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      const name = this.parseName();
      this.expectToken(_tokenKind.TokenKind.COLON);
      const type = this.parseTypeReference();
      let defaultValue;
      if (this.expectOptionalToken(_tokenKind.TokenKind.EQUALS)) {
        defaultValue = this.parseConstValueLiteral();
      }
      const directives = this.parseConstDirectives();
      return this.node(start, {
        kind: _kinds.Kind.INPUT_VALUE_DEFINITION,
        description,
        name,
        type,
        defaultValue,
        directives
      });
    }
    parseInterfaceTypeDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("interface");
      const name = this.parseName();
      const interfaces = this.parseImplementsInterfaces();
      const directives = this.parseConstDirectives();
      const fields = this.parseFieldsDefinition();
      return this.node(start, {
        kind: _kinds.Kind.INTERFACE_TYPE_DEFINITION,
        description,
        name,
        interfaces,
        directives,
        fields
      });
    }
    parseUnionTypeDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("union");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const types2 = this.parseUnionMemberTypes();
      return this.node(start, {
        kind: _kinds.Kind.UNION_TYPE_DEFINITION,
        description,
        name,
        directives,
        types: types2
      });
    }
    parseUnionMemberTypes() {
      return this.expectOptionalToken(_tokenKind.TokenKind.EQUALS) ? this.delimitedMany(_tokenKind.TokenKind.PIPE, this.parseNamedType) : [];
    }
    parseEnumTypeDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("enum");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const values = this.parseEnumValuesDefinition();
      return this.node(start, {
        kind: _kinds.Kind.ENUM_TYPE_DEFINITION,
        description,
        name,
        directives,
        values
      });
    }
    parseEnumValuesDefinition() {
      return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseEnumValueDefinition, _tokenKind.TokenKind.BRACE_R);
    }
    parseEnumValueDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      const name = this.parseEnumValueName();
      const directives = this.parseConstDirectives();
      return this.node(start, {
        kind: _kinds.Kind.ENUM_VALUE_DEFINITION,
        description,
        name,
        directives
      });
    }
    parseEnumValueName() {
      if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") {
        throw (0, _syntaxError.syntaxError)(this._lexer.source, this._lexer.token.start, `${getTokenDesc2(this._lexer.token)} is reserved and cannot be used for an enum value.`);
      }
      return this.parseName();
    }
    parseInputObjectTypeDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("input");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const fields = this.parseInputFieldsDefinition();
      return this.node(start, {
        kind: _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION,
        description,
        name,
        directives,
        fields
      });
    }
    parseInputFieldsDefinition() {
      return this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseInputValueDef, _tokenKind.TokenKind.BRACE_R);
    }
    parseTypeSystemExtension() {
      const keywordToken = this._lexer.lookahead();
      if (keywordToken.kind === _tokenKind.TokenKind.NAME) {
        switch (keywordToken.value) {
          case "schema":
            return this.parseSchemaExtension();
          case "scalar":
            return this.parseScalarTypeExtension();
          case "type":
            return this.parseObjectTypeExtension();
          case "interface":
            return this.parseInterfaceTypeExtension();
          case "union":
            return this.parseUnionTypeExtension();
          case "enum":
            return this.parseEnumTypeExtension();
          case "input":
            return this.parseInputObjectTypeExtension();
        }
      }
      throw this.unexpected(keywordToken);
    }
    parseSchemaExtension() {
      const start = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("schema");
      const directives = this.parseConstDirectives();
      const operationTypes = this.optionalMany(_tokenKind.TokenKind.BRACE_L, this.parseOperationTypeDefinition, _tokenKind.TokenKind.BRACE_R);
      if (directives.length === 0 && operationTypes.length === 0) {
        throw this.unexpected();
      }
      return this.node(start, {
        kind: _kinds.Kind.SCHEMA_EXTENSION,
        directives,
        operationTypes
      });
    }
    parseScalarTypeExtension() {
      const start = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("scalar");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      if (directives.length === 0) {
        throw this.unexpected();
      }
      return this.node(start, {
        kind: _kinds.Kind.SCALAR_TYPE_EXTENSION,
        name,
        directives
      });
    }
    parseObjectTypeExtension() {
      const start = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("type");
      const name = this.parseName();
      const interfaces = this.parseImplementsInterfaces();
      const directives = this.parseConstDirectives();
      const fields = this.parseFieldsDefinition();
      if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
        throw this.unexpected();
      }
      return this.node(start, {
        kind: _kinds.Kind.OBJECT_TYPE_EXTENSION,
        name,
        interfaces,
        directives,
        fields
      });
    }
    parseInterfaceTypeExtension() {
      const start = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("interface");
      const name = this.parseName();
      const interfaces = this.parseImplementsInterfaces();
      const directives = this.parseConstDirectives();
      const fields = this.parseFieldsDefinition();
      if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
        throw this.unexpected();
      }
      return this.node(start, {
        kind: _kinds.Kind.INTERFACE_TYPE_EXTENSION,
        name,
        interfaces,
        directives,
        fields
      });
    }
    parseUnionTypeExtension() {
      const start = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("union");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const types2 = this.parseUnionMemberTypes();
      if (directives.length === 0 && types2.length === 0) {
        throw this.unexpected();
      }
      return this.node(start, {
        kind: _kinds.Kind.UNION_TYPE_EXTENSION,
        name,
        directives,
        types: types2
      });
    }
    parseEnumTypeExtension() {
      const start = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("enum");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const values = this.parseEnumValuesDefinition();
      if (directives.length === 0 && values.length === 0) {
        throw this.unexpected();
      }
      return this.node(start, {
        kind: _kinds.Kind.ENUM_TYPE_EXTENSION,
        name,
        directives,
        values
      });
    }
    parseInputObjectTypeExtension() {
      const start = this._lexer.token;
      this.expectKeyword("extend");
      this.expectKeyword("input");
      const name = this.parseName();
      const directives = this.parseConstDirectives();
      const fields = this.parseInputFieldsDefinition();
      if (directives.length === 0 && fields.length === 0) {
        throw this.unexpected();
      }
      return this.node(start, {
        kind: _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION,
        name,
        directives,
        fields
      });
    }
    parseDirectiveDefinition() {
      const start = this._lexer.token;
      const description = this.parseDescription();
      this.expectKeyword("directive");
      this.expectToken(_tokenKind.TokenKind.AT);
      const name = this.parseName();
      const args = this.parseArgumentDefs();
      const repeatable = this.expectOptionalKeyword("repeatable");
      this.expectKeyword("on");
      const locations = this.parseDirectiveLocations();
      return this.node(start, {
        kind: _kinds.Kind.DIRECTIVE_DEFINITION,
        description,
        name,
        arguments: args,
        repeatable,
        locations
      });
    }
    parseDirectiveLocations() {
      return this.delimitedMany(_tokenKind.TokenKind.PIPE, this.parseDirectiveLocation);
    }
    parseDirectiveLocation() {
      const start = this._lexer.token;
      const name = this.parseName();
      if (Object.prototype.hasOwnProperty.call(_directiveLocation.DirectiveLocation, name.value)) {
        return name;
      }
      throw this.unexpected(start);
    }
    node(startToken, node) {
      if (this._options.noLocation !== true) {
        node.loc = new _ast.Location(startToken, this._lexer.lastToken, this._lexer.source);
      }
      return node;
    }
    peek(kind) {
      return this._lexer.token.kind === kind;
    }
    expectToken(kind) {
      const token = this._lexer.token;
      if (token.kind === kind) {
        this.advanceLexer();
        return token;
      }
      throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, `Expected ${getTokenKindDesc2(kind)}, found ${getTokenDesc2(token)}.`);
    }
    expectOptionalToken(kind) {
      const token = this._lexer.token;
      if (token.kind === kind) {
        this.advanceLexer();
        return true;
      }
      return false;
    }
    expectKeyword(value) {
      const token = this._lexer.token;
      if (token.kind === _tokenKind.TokenKind.NAME && token.value === value) {
        this.advanceLexer();
      } else {
        throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, `Expected "${value}", found ${getTokenDesc2(token)}.`);
      }
    }
    expectOptionalKeyword(value) {
      const token = this._lexer.token;
      if (token.kind === _tokenKind.TokenKind.NAME && token.value === value) {
        this.advanceLexer();
        return true;
      }
      return false;
    }
    unexpected(atToken) {
      const token = atToken !== null && atToken !== undefined ? atToken : this._lexer.token;
      return (0, _syntaxError.syntaxError)(this._lexer.source, token.start, `Unexpected ${getTokenDesc2(token)}.`);
    }
    any(openKind, parseFn, closeKind) {
      this.expectToken(openKind);
      const nodes = [];
      while (!this.expectOptionalToken(closeKind)) {
        nodes.push(parseFn.call(this));
      }
      return nodes;
    }
    optionalMany(openKind, parseFn, closeKind) {
      if (this.expectOptionalToken(openKind)) {
        const nodes = [];
        do {
          nodes.push(parseFn.call(this));
        } while (!this.expectOptionalToken(closeKind));
        return nodes;
      }
      return [];
    }
    many(openKind, parseFn, closeKind) {
      this.expectToken(openKind);
      const nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    delimitedMany(delimiterKind, parseFn) {
      this.expectOptionalToken(delimiterKind);
      const nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (this.expectOptionalToken(delimiterKind));
      return nodes;
    }
    advanceLexer() {
      const { maxTokens } = this._options;
      const token = this._lexer.advance();
      if (token.kind !== _tokenKind.TokenKind.EOF) {
        ++this._tokenCounter;
        if (maxTokens !== undefined && this._tokenCounter > maxTokens) {
          throw (0, _syntaxError.syntaxError)(this._lexer.source, token.start, `Document contains more that ${maxTokens} tokens. Parsing aborted.`);
        }
      }
    }
  }
  exports.Parser = Parser2;
  function getTokenDesc2(token) {
    const value = token.value;
    return getTokenKindDesc2(token.kind) + (value != null ? ` "${value}"` : "");
  }
  function getTokenKindDesc2(kind) {
    return (0, _lexer.isPunctuatorTokenKind)(kind) ? `"${kind}"` : kind;
  }
});

// node_modules/graphql/jsutils/didYouMean.js
var require_didYouMean = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.didYouMean = didYouMean;
  var MAX_SUGGESTIONS = 5;
  function didYouMean(firstArg, secondArg) {
    const [subMessage, suggestionsArg] = secondArg ? [firstArg, secondArg] : [undefined, firstArg];
    let message = " Did you mean ";
    if (subMessage) {
      message += subMessage + " ";
    }
    const suggestions = suggestionsArg.map((x) => `"${x}"`);
    switch (suggestions.length) {
      case 0:
        return "";
      case 1:
        return message + suggestions[0] + "?";
      case 2:
        return message + suggestions[0] + " or " + suggestions[1] + "?";
    }
    const selected = suggestions.slice(0, MAX_SUGGESTIONS);
    const lastItem = selected.pop();
    return message + selected.join(", ") + ", or " + lastItem + "?";
  }
});

// node_modules/graphql/jsutils/identityFunc.js
var require_identityFunc = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.identityFunc = identityFunc;
  function identityFunc(x) {
    return x;
  }
});

// node_modules/graphql/jsutils/keyMap.js
var require_keyMap = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.keyMap = keyMap;
  function keyMap(list, keyFn) {
    const result = Object.create(null);
    for (const item of list) {
      result[keyFn(item)] = item;
    }
    return result;
  }
});

// node_modules/graphql/jsutils/keyValMap.js
var require_keyValMap = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.keyValMap = keyValMap;
  function keyValMap(list, keyFn, valFn) {
    const result = Object.create(null);
    for (const item of list) {
      result[keyFn(item)] = valFn(item);
    }
    return result;
  }
});

// node_modules/graphql/jsutils/mapValue.js
var require_mapValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mapValue = mapValue;
  function mapValue(map2, fn) {
    const result = Object.create(null);
    for (const key of Object.keys(map2)) {
      result[key] = fn(map2[key], key);
    }
    return result;
  }
});

// node_modules/graphql/jsutils/naturalCompare.js
var require_naturalCompare = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.naturalCompare = naturalCompare;
  function naturalCompare(aStr, bStr) {
    let aIndex = 0;
    let bIndex = 0;
    while (aIndex < aStr.length && bIndex < bStr.length) {
      let aChar = aStr.charCodeAt(aIndex);
      let bChar = bStr.charCodeAt(bIndex);
      if (isDigit2(aChar) && isDigit2(bChar)) {
        let aNum = 0;
        do {
          ++aIndex;
          aNum = aNum * 10 + aChar - DIGIT_0;
          aChar = aStr.charCodeAt(aIndex);
        } while (isDigit2(aChar) && aNum > 0);
        let bNum = 0;
        do {
          ++bIndex;
          bNum = bNum * 10 + bChar - DIGIT_0;
          bChar = bStr.charCodeAt(bIndex);
        } while (isDigit2(bChar) && bNum > 0);
        if (aNum < bNum) {
          return -1;
        }
        if (aNum > bNum) {
          return 1;
        }
      } else {
        if (aChar < bChar) {
          return -1;
        }
        if (aChar > bChar) {
          return 1;
        }
        ++aIndex;
        ++bIndex;
      }
    }
    return aStr.length - bStr.length;
  }
  var DIGIT_0 = 48;
  var DIGIT_9 = 57;
  function isDigit2(code) {
    return !isNaN(code) && DIGIT_0 <= code && code <= DIGIT_9;
  }
});

// node_modules/graphql/jsutils/suggestionList.js
var require_suggestionList = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.suggestionList = suggestionList;
  var _naturalCompare = require_naturalCompare();
  function suggestionList(input, options) {
    const optionsByDistance = Object.create(null);
    const lexicalDistance = new LexicalDistance(input);
    const threshold = Math.floor(input.length * 0.4) + 1;
    for (const option of options) {
      const distance = lexicalDistance.measure(option, threshold);
      if (distance !== undefined) {
        optionsByDistance[option] = distance;
      }
    }
    return Object.keys(optionsByDistance).sort((a, b) => {
      const distanceDiff = optionsByDistance[a] - optionsByDistance[b];
      return distanceDiff !== 0 ? distanceDiff : (0, _naturalCompare.naturalCompare)(a, b);
    });
  }

  class LexicalDistance {
    constructor(input) {
      this._input = input;
      this._inputLowerCase = input.toLowerCase();
      this._inputArray = stringToArray(this._inputLowerCase);
      this._rows = [
        new Array(input.length + 1).fill(0),
        new Array(input.length + 1).fill(0),
        new Array(input.length + 1).fill(0)
      ];
    }
    measure(option, threshold) {
      if (this._input === option) {
        return 0;
      }
      const optionLowerCase = option.toLowerCase();
      if (this._inputLowerCase === optionLowerCase) {
        return 1;
      }
      let a = stringToArray(optionLowerCase);
      let b = this._inputArray;
      if (a.length < b.length) {
        const tmp = a;
        a = b;
        b = tmp;
      }
      const aLength = a.length;
      const bLength = b.length;
      if (aLength - bLength > threshold) {
        return;
      }
      const rows = this._rows;
      for (let j = 0;j <= bLength; j++) {
        rows[0][j] = j;
      }
      for (let i = 1;i <= aLength; i++) {
        const upRow = rows[(i - 1) % 3];
        const currentRow = rows[i % 3];
        let smallestCell = currentRow[0] = i;
        for (let j = 1;j <= bLength; j++) {
          const cost = a[i - 1] === b[j - 1] ? 0 : 1;
          let currentCell = Math.min(upRow[j] + 1, currentRow[j - 1] + 1, upRow[j - 1] + cost);
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            const doubleDiagonalCell = rows[(i - 2) % 3][j - 2];
            currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
          }
          if (currentCell < smallestCell) {
            smallestCell = currentCell;
          }
          currentRow[j] = currentCell;
        }
        if (smallestCell > threshold) {
          return;
        }
      }
      const distance = rows[aLength % 3][bLength];
      return distance <= threshold ? distance : undefined;
    }
  }
  function stringToArray(str) {
    const strLength = str.length;
    const array2 = new Array(strLength);
    for (let i = 0;i < strLength; ++i) {
      array2[i] = str.charCodeAt(i);
    }
    return array2;
  }
});

// node_modules/graphql/jsutils/toObjMap.js
var require_toObjMap = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toObjMap = toObjMap;
  function toObjMap(obj) {
    if (obj == null) {
      return Object.create(null);
    }
    if (Object.getPrototypeOf(obj) === null) {
      return obj;
    }
    const map2 = Object.create(null);
    for (const [key, value] of Object.entries(obj)) {
      map2[key] = value;
    }
    return map2;
  }
});

// node_modules/graphql/language/printString.js
var require_printString = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.printString = printString;
  function printString(str) {
    return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
  }
  var escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
  function escapedReplacer(str) {
    return escapeSequences[str.charCodeAt(0)];
  }
  var escapeSequences = [
    "\\u0000",
    "\\u0001",
    "\\u0002",
    "\\u0003",
    "\\u0004",
    "\\u0005",
    "\\u0006",
    "\\u0007",
    "\\b",
    "\\t",
    "\\n",
    "\\u000B",
    "\\f",
    "\\r",
    "\\u000E",
    "\\u000F",
    "\\u0010",
    "\\u0011",
    "\\u0012",
    "\\u0013",
    "\\u0014",
    "\\u0015",
    "\\u0016",
    "\\u0017",
    "\\u0018",
    "\\u0019",
    "\\u001A",
    "\\u001B",
    "\\u001C",
    "\\u001D",
    "\\u001E",
    "\\u001F",
    "",
    "",
    "\\\"",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\\\",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "\\u007F",
    "\\u0080",
    "\\u0081",
    "\\u0082",
    "\\u0083",
    "\\u0084",
    "\\u0085",
    "\\u0086",
    "\\u0087",
    "\\u0088",
    "\\u0089",
    "\\u008A",
    "\\u008B",
    "\\u008C",
    "\\u008D",
    "\\u008E",
    "\\u008F",
    "\\u0090",
    "\\u0091",
    "\\u0092",
    "\\u0093",
    "\\u0094",
    "\\u0095",
    "\\u0096",
    "\\u0097",
    "\\u0098",
    "\\u0099",
    "\\u009A",
    "\\u009B",
    "\\u009C",
    "\\u009D",
    "\\u009E",
    "\\u009F"
  ];
});

// node_modules/graphql/language/visitor.js
var require_visitor = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BREAK = undefined;
  exports.getEnterLeaveForKind = getEnterLeaveForKind;
  exports.getVisitFn = getVisitFn;
  exports.visit = visit;
  exports.visitInParallel = visitInParallel;
  var _devAssert = require_devAssert();
  var _inspect = require_inspect();
  var _ast = require_ast();
  var _kinds = require_kinds();
  var BREAK = Object.freeze({});
  exports.BREAK = BREAK;
  function visit(root, visitor, visitorKeys = _ast.QueryDocumentKeys) {
    const enterLeaveMap = new Map;
    for (const kind of Object.values(_kinds.Kind)) {
      enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
    }
    let stack = undefined;
    let inArray = Array.isArray(root);
    let keys = [root];
    let index = -1;
    let edits = [];
    let node = root;
    let key = undefined;
    let parent = undefined;
    const path = [];
    const ancestors = [];
    do {
      index++;
      const isLeaving = index === keys.length;
      const isEdited = isLeaving && edits.length !== 0;
      if (isLeaving) {
        key = ancestors.length === 0 ? undefined : path[path.length - 1];
        node = parent;
        parent = ancestors.pop();
        if (isEdited) {
          if (inArray) {
            node = node.slice();
            let editOffset = 0;
            for (const [editKey, editValue] of edits) {
              const arrayKey = editKey - editOffset;
              if (editValue === null) {
                node.splice(arrayKey, 1);
                editOffset++;
              } else {
                node[arrayKey] = editValue;
              }
            }
          } else {
            node = { ...node };
            for (const [editKey, editValue] of edits) {
              node[editKey] = editValue;
            }
          }
        }
        index = stack.index;
        keys = stack.keys;
        edits = stack.edits;
        inArray = stack.inArray;
        stack = stack.prev;
      } else if (parent) {
        key = inArray ? index : keys[index];
        node = parent[key];
        if (node === null || node === undefined) {
          continue;
        }
        path.push(key);
      }
      let result;
      if (!Array.isArray(node)) {
        var _enterLeaveMap$get, _enterLeaveMap$get2;
        (0, _ast.isNode)(node) || (0, _devAssert.devAssert)(false, `Invalid AST Node: ${(0, _inspect.inspect)(node)}.`);
        const visitFn = isLeaving ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get === undefined ? undefined : _enterLeaveMap$get.leave : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get2 === undefined ? undefined : _enterLeaveMap$get2.enter;
        result = visitFn === null || visitFn === undefined ? undefined : visitFn.call(visitor, node, key, parent, path, ancestors);
        if (result === BREAK) {
          break;
        }
        if (result === false) {
          if (!isLeaving) {
            path.pop();
            continue;
          }
        } else if (result !== undefined) {
          edits.push([key, result]);
          if (!isLeaving) {
            if ((0, _ast.isNode)(result)) {
              node = result;
            } else {
              path.pop();
              continue;
            }
          }
        }
      }
      if (result === undefined && isEdited) {
        edits.push([key, node]);
      }
      if (isLeaving) {
        path.pop();
      } else {
        var _node$kind;
        stack = {
          inArray,
          index,
          keys,
          edits,
          prev: stack
        };
        inArray = Array.isArray(node);
        keys = inArray ? node : (_node$kind = visitorKeys[node.kind]) !== null && _node$kind !== undefined ? _node$kind : [];
        index = -1;
        edits = [];
        if (parent) {
          ancestors.push(parent);
        }
        parent = node;
      }
    } while (stack !== undefined);
    if (edits.length !== 0) {
      return edits[edits.length - 1][1];
    }
    return root;
  }
  function visitInParallel(visitors) {
    const skipping = new Array(visitors.length).fill(null);
    const mergedVisitor = Object.create(null);
    for (const kind of Object.values(_kinds.Kind)) {
      let hasVisitor = false;
      const enterList = new Array(visitors.length).fill(undefined);
      const leaveList = new Array(visitors.length).fill(undefined);
      for (let i = 0;i < visitors.length; ++i) {
        const { enter, leave } = getEnterLeaveForKind(visitors[i], kind);
        hasVisitor || (hasVisitor = enter != null || leave != null);
        enterList[i] = enter;
        leaveList[i] = leave;
      }
      if (!hasVisitor) {
        continue;
      }
      const mergedEnterLeave = {
        enter(...args) {
          const node = args[0];
          for (let i = 0;i < visitors.length; i++) {
            if (skipping[i] === null) {
              var _enterList$i;
              const result = (_enterList$i = enterList[i]) === null || _enterList$i === undefined ? undefined : _enterList$i.apply(visitors[i], args);
              if (result === false) {
                skipping[i] = node;
              } else if (result === BREAK) {
                skipping[i] = BREAK;
              } else if (result !== undefined) {
                return result;
              }
            }
          }
        },
        leave(...args) {
          const node = args[0];
          for (let i = 0;i < visitors.length; i++) {
            if (skipping[i] === null) {
              var _leaveList$i;
              const result = (_leaveList$i = leaveList[i]) === null || _leaveList$i === undefined ? undefined : _leaveList$i.apply(visitors[i], args);
              if (result === BREAK) {
                skipping[i] = BREAK;
              } else if (result !== undefined && result !== false) {
                return result;
              }
            } else if (skipping[i] === node) {
              skipping[i] = null;
            }
          }
        }
      };
      mergedVisitor[kind] = mergedEnterLeave;
    }
    return mergedVisitor;
  }
  function getEnterLeaveForKind(visitor, kind) {
    const kindVisitor = visitor[kind];
    if (typeof kindVisitor === "object") {
      return kindVisitor;
    } else if (typeof kindVisitor === "function") {
      return {
        enter: kindVisitor,
        leave: undefined
      };
    }
    return {
      enter: visitor.enter,
      leave: visitor.leave
    };
  }
  function getVisitFn(visitor, kind, isLeaving) {
    const { enter, leave } = getEnterLeaveForKind(visitor, kind);
    return isLeaving ? leave : enter;
  }
});

// node_modules/graphql/language/printer.js
var require_printer = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.print = print;
  var _blockString = require_blockString();
  var _printString = require_printString();
  var _visitor = require_visitor();
  function print(ast) {
    return (0, _visitor.visit)(ast, printDocASTReducer);
  }
  var MAX_LINE_LENGTH = 80;
  var printDocASTReducer = {
    Name: {
      leave: (node) => node.value
    },
    Variable: {
      leave: (node) => "$" + node.name
    },
    Document: {
      leave: (node) => join(node.definitions, `

`)
    },
    OperationDefinition: {
      leave(node) {
        const varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
        const prefix = join([
          node.operation,
          join([node.name, varDefs]),
          join(node.directives, " ")
        ], " ");
        return (prefix === "query" ? "" : prefix + " ") + node.selectionSet;
      }
    },
    VariableDefinition: {
      leave: ({ variable, type, defaultValue, directives }) => variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "))
    },
    SelectionSet: {
      leave: ({ selections }) => block(selections)
    },
    Field: {
      leave({ alias, name, arguments: args, directives, selectionSet }) {
        const prefix = wrap("", alias, ": ") + name;
        let argsLine = prefix + wrap("(", join(args, ", "), ")");
        if (argsLine.length > MAX_LINE_LENGTH) {
          argsLine = prefix + wrap(`(
`, indent(join(args, `
`)), `
)`);
        }
        return join([argsLine, join(directives, " "), selectionSet], " ");
      }
    },
    Argument: {
      leave: ({ name, value }) => name + ": " + value
    },
    FragmentSpread: {
      leave: ({ name, directives }) => "..." + name + wrap(" ", join(directives, " "))
    },
    InlineFragment: {
      leave: ({ typeCondition, directives, selectionSet }) => join([
        "...",
        wrap("on ", typeCondition),
        join(directives, " "),
        selectionSet
      ], " ")
    },
    FragmentDefinition: {
      leave: ({ name, typeCondition, variableDefinitions, directives, selectionSet }) => `fragment ${name}${wrap("(", join(variableDefinitions, ", "), ")")} ` + `on ${typeCondition} ${wrap("", join(directives, " "), " ")}` + selectionSet
    },
    IntValue: {
      leave: ({ value }) => value
    },
    FloatValue: {
      leave: ({ value }) => value
    },
    StringValue: {
      leave: ({ value, block: isBlockString }) => isBlockString ? (0, _blockString.printBlockString)(value) : (0, _printString.printString)(value)
    },
    BooleanValue: {
      leave: ({ value }) => value ? "true" : "false"
    },
    NullValue: {
      leave: () => "null"
    },
    EnumValue: {
      leave: ({ value }) => value
    },
    ListValue: {
      leave: ({ values }) => "[" + join(values, ", ") + "]"
    },
    ObjectValue: {
      leave: ({ fields }) => "{" + join(fields, ", ") + "}"
    },
    ObjectField: {
      leave: ({ name, value }) => name + ": " + value
    },
    Directive: {
      leave: ({ name, arguments: args }) => "@" + name + wrap("(", join(args, ", "), ")")
    },
    NamedType: {
      leave: ({ name }) => name
    },
    ListType: {
      leave: ({ type }) => "[" + type + "]"
    },
    NonNullType: {
      leave: ({ type }) => type + "!"
    },
    SchemaDefinition: {
      leave: ({ description, directives, operationTypes }) => wrap("", description, `
`) + join(["schema", join(directives, " "), block(operationTypes)], " ")
    },
    OperationTypeDefinition: {
      leave: ({ operation, type }) => operation + ": " + type
    },
    ScalarTypeDefinition: {
      leave: ({ description, name, directives }) => wrap("", description, `
`) + join(["scalar", name, join(directives, " ")], " ")
    },
    ObjectTypeDefinition: {
      leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, `
`) + join([
        "type",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ], " ")
    },
    FieldDefinition: {
      leave: ({ description, name, arguments: args, type, directives }) => wrap("", description, `
`) + name + (hasMultilineItems(args) ? wrap(`(
`, indent(join(args, `
`)), `
)`) : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "))
    },
    InputValueDefinition: {
      leave: ({ description, name, type, defaultValue, directives }) => wrap("", description, `
`) + join([name + ": " + type, wrap("= ", defaultValue), join(directives, " ")], " ")
    },
    InterfaceTypeDefinition: {
      leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, `
`) + join([
        "interface",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ], " ")
    },
    UnionTypeDefinition: {
      leave: ({ description, name, directives, types: types2 }) => wrap("", description, `
`) + join(["union", name, join(directives, " "), wrap("= ", join(types2, " | "))], " ")
    },
    EnumTypeDefinition: {
      leave: ({ description, name, directives, values }) => wrap("", description, `
`) + join(["enum", name, join(directives, " "), block(values)], " ")
    },
    EnumValueDefinition: {
      leave: ({ description, name, directives }) => wrap("", description, `
`) + join([name, join(directives, " ")], " ")
    },
    InputObjectTypeDefinition: {
      leave: ({ description, name, directives, fields }) => wrap("", description, `
`) + join(["input", name, join(directives, " "), block(fields)], " ")
    },
    DirectiveDefinition: {
      leave: ({ description, name, arguments: args, repeatable, locations }) => wrap("", description, `
`) + "directive @" + name + (hasMultilineItems(args) ? wrap(`(
`, indent(join(args, `
`)), `
)`) : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ")
    },
    SchemaExtension: {
      leave: ({ directives, operationTypes }) => join(["extend schema", join(directives, " "), block(operationTypes)], " ")
    },
    ScalarTypeExtension: {
      leave: ({ name, directives }) => join(["extend scalar", name, join(directives, " ")], " ")
    },
    ObjectTypeExtension: {
      leave: ({ name, interfaces, directives, fields }) => join([
        "extend type",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ], " ")
    },
    InterfaceTypeExtension: {
      leave: ({ name, interfaces, directives, fields }) => join([
        "extend interface",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ], " ")
    },
    UnionTypeExtension: {
      leave: ({ name, directives, types: types2 }) => join([
        "extend union",
        name,
        join(directives, " "),
        wrap("= ", join(types2, " | "))
      ], " ")
    },
    EnumTypeExtension: {
      leave: ({ name, directives, values }) => join(["extend enum", name, join(directives, " "), block(values)], " ")
    },
    InputObjectTypeExtension: {
      leave: ({ name, directives, fields }) => join(["extend input", name, join(directives, " "), block(fields)], " ")
    }
  };
  function join(maybeArray, separator = "") {
    var _maybeArray$filter$jo;
    return (_maybeArray$filter$jo = maybeArray === null || maybeArray === undefined ? undefined : maybeArray.filter((x) => x).join(separator)) !== null && _maybeArray$filter$jo !== undefined ? _maybeArray$filter$jo : "";
  }
  function block(array2) {
    return wrap(`{
`, indent(join(array2, `
`)), `
}`);
  }
  function wrap(start, maybeString, end = "") {
    return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
  }
  function indent(str) {
    return wrap("  ", str.replace(/\n/g, `
  `));
  }
  function hasMultilineItems(maybeArray) {
    var _maybeArray$some;
    return (_maybeArray$some = maybeArray === null || maybeArray === undefined ? undefined : maybeArray.some((str) => str.includes(`
`))) !== null && _maybeArray$some !== undefined ? _maybeArray$some : false;
  }
});

// node_modules/graphql/utilities/valueFromASTUntyped.js
var require_valueFromASTUntyped = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.valueFromASTUntyped = valueFromASTUntyped;
  var _keyValMap = require_keyValMap();
  var _kinds = require_kinds();
  function valueFromASTUntyped(valueNode, variables) {
    switch (valueNode.kind) {
      case _kinds.Kind.NULL:
        return null;
      case _kinds.Kind.INT:
        return parseInt(valueNode.value, 10);
      case _kinds.Kind.FLOAT:
        return parseFloat(valueNode.value);
      case _kinds.Kind.STRING:
      case _kinds.Kind.ENUM:
      case _kinds.Kind.BOOLEAN:
        return valueNode.value;
      case _kinds.Kind.LIST:
        return valueNode.values.map((node) => valueFromASTUntyped(node, variables));
      case _kinds.Kind.OBJECT:
        return (0, _keyValMap.keyValMap)(valueNode.fields, (field) => field.name.value, (field) => valueFromASTUntyped(field.value, variables));
      case _kinds.Kind.VARIABLE:
        return variables === null || variables === undefined ? undefined : variables[valueNode.name.value];
    }
  }
});

// node_modules/graphql/type/assertName.js
var require_assertName = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.assertEnumValueName = assertEnumValueName;
  exports.assertName = assertName;
  var _devAssert = require_devAssert();
  var _GraphQLError = require_GraphQLError();
  var _characterClasses = require_characterClasses();
  function assertName(name) {
    name != null || (0, _devAssert.devAssert)(false, "Must provide name.");
    typeof name === "string" || (0, _devAssert.devAssert)(false, "Expected name to be a string.");
    if (name.length === 0) {
      throw new _GraphQLError.GraphQLError("Expected name to be a non-empty string.");
    }
    for (let i = 1;i < name.length; ++i) {
      if (!(0, _characterClasses.isNameContinue)(name.charCodeAt(i))) {
        throw new _GraphQLError.GraphQLError(`Names must only contain [_a-zA-Z0-9] but "${name}" does not.`);
      }
    }
    if (!(0, _characterClasses.isNameStart)(name.charCodeAt(0))) {
      throw new _GraphQLError.GraphQLError(`Names must start with [_a-zA-Z] but "${name}" does not.`);
    }
    return name;
  }
  function assertEnumValueName(name) {
    if (name === "true" || name === "false" || name === "null") {
      throw new _GraphQLError.GraphQLError(`Enum values cannot be named: ${name}`);
    }
    return assertName(name);
  }
});

// node_modules/graphql/type/definition.js
var require_definition = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GraphQLUnionType = exports.GraphQLScalarType = exports.GraphQLObjectType = exports.GraphQLNonNull = exports.GraphQLList = exports.GraphQLInterfaceType = exports.GraphQLInputObjectType = exports.GraphQLEnumType = undefined;
  exports.argsToArgsConfig = argsToArgsConfig;
  exports.assertAbstractType = assertAbstractType;
  exports.assertCompositeType = assertCompositeType;
  exports.assertEnumType = assertEnumType;
  exports.assertInputObjectType = assertInputObjectType;
  exports.assertInputType = assertInputType;
  exports.assertInterfaceType = assertInterfaceType;
  exports.assertLeafType = assertLeafType;
  exports.assertListType = assertListType;
  exports.assertNamedType = assertNamedType;
  exports.assertNonNullType = assertNonNullType;
  exports.assertNullableType = assertNullableType;
  exports.assertObjectType = assertObjectType;
  exports.assertOutputType = assertOutputType;
  exports.assertScalarType = assertScalarType;
  exports.assertType = assertType;
  exports.assertUnionType = assertUnionType;
  exports.assertWrappingType = assertWrappingType;
  exports.defineArguments = defineArguments;
  exports.getNamedType = getNamedType;
  exports.getNullableType = getNullableType;
  exports.isAbstractType = isAbstractType;
  exports.isCompositeType = isCompositeType;
  exports.isEnumType = isEnumType;
  exports.isInputObjectType = isInputObjectType;
  exports.isInputType = isInputType;
  exports.isInterfaceType = isInterfaceType;
  exports.isLeafType = isLeafType;
  exports.isListType = isListType;
  exports.isNamedType = isNamedType;
  exports.isNonNullType = isNonNullType;
  exports.isNullableType = isNullableType;
  exports.isObjectType = isObjectType;
  exports.isOutputType = isOutputType;
  exports.isRequiredArgument = isRequiredArgument;
  exports.isRequiredInputField = isRequiredInputField;
  exports.isScalarType = isScalarType;
  exports.isType = isType;
  exports.isUnionType = isUnionType;
  exports.isWrappingType = isWrappingType;
  exports.resolveObjMapThunk = resolveObjMapThunk;
  exports.resolveReadonlyArrayThunk = resolveReadonlyArrayThunk;
  var _devAssert = require_devAssert();
  var _didYouMean = require_didYouMean();
  var _identityFunc = require_identityFunc();
  var _inspect = require_inspect();
  var _instanceOf = require_instanceOf();
  var _isObjectLike = require_isObjectLike();
  var _keyMap = require_keyMap();
  var _keyValMap = require_keyValMap();
  var _mapValue = require_mapValue();
  var _suggestionList = require_suggestionList();
  var _toObjMap = require_toObjMap();
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _printer = require_printer();
  var _valueFromASTUntyped = require_valueFromASTUntyped();
  var _assertName = require_assertName();
  function isType(type) {
    return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
  }
  function assertType(type) {
    if (!isType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL type.`);
    }
    return type;
  }
  function isScalarType(type) {
    return (0, _instanceOf.instanceOf)(type, GraphQLScalarType);
  }
  function assertScalarType(type) {
    if (!isScalarType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL Scalar type.`);
    }
    return type;
  }
  function isObjectType(type) {
    return (0, _instanceOf.instanceOf)(type, GraphQLObjectType);
  }
  function assertObjectType(type) {
    if (!isObjectType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL Object type.`);
    }
    return type;
  }
  function isInterfaceType(type) {
    return (0, _instanceOf.instanceOf)(type, GraphQLInterfaceType);
  }
  function assertInterfaceType(type) {
    if (!isInterfaceType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL Interface type.`);
    }
    return type;
  }
  function isUnionType(type) {
    return (0, _instanceOf.instanceOf)(type, GraphQLUnionType);
  }
  function assertUnionType(type) {
    if (!isUnionType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL Union type.`);
    }
    return type;
  }
  function isEnumType(type) {
    return (0, _instanceOf.instanceOf)(type, GraphQLEnumType);
  }
  function assertEnumType(type) {
    if (!isEnumType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL Enum type.`);
    }
    return type;
  }
  function isInputObjectType(type) {
    return (0, _instanceOf.instanceOf)(type, GraphQLInputObjectType);
  }
  function assertInputObjectType(type) {
    if (!isInputObjectType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL Input Object type.`);
    }
    return type;
  }
  function isListType(type) {
    return (0, _instanceOf.instanceOf)(type, GraphQLList);
  }
  function assertListType(type) {
    if (!isListType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL List type.`);
    }
    return type;
  }
  function isNonNullType(type) {
    return (0, _instanceOf.instanceOf)(type, GraphQLNonNull);
  }
  function assertNonNullType(type) {
    if (!isNonNullType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL Non-Null type.`);
    }
    return type;
  }
  function isInputType(type) {
    return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
  }
  function assertInputType(type) {
    if (!isInputType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL input type.`);
    }
    return type;
  }
  function isOutputType(type) {
    return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isWrappingType(type) && isOutputType(type.ofType);
  }
  function assertOutputType(type) {
    if (!isOutputType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL output type.`);
    }
    return type;
  }
  function isLeafType(type) {
    return isScalarType(type) || isEnumType(type);
  }
  function assertLeafType(type) {
    if (!isLeafType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL leaf type.`);
    }
    return type;
  }
  function isCompositeType(type) {
    return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
  }
  function assertCompositeType(type) {
    if (!isCompositeType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL composite type.`);
    }
    return type;
  }
  function isAbstractType(type) {
    return isInterfaceType(type) || isUnionType(type);
  }
  function assertAbstractType(type) {
    if (!isAbstractType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL abstract type.`);
    }
    return type;
  }

  class GraphQLList {
    constructor(ofType) {
      isType(ofType) || (0, _devAssert.devAssert)(false, `Expected ${(0, _inspect.inspect)(ofType)} to be a GraphQL type.`);
      this.ofType = ofType;
    }
    get [Symbol.toStringTag]() {
      return "GraphQLList";
    }
    toString() {
      return "[" + String(this.ofType) + "]";
    }
    toJSON() {
      return this.toString();
    }
  }
  exports.GraphQLList = GraphQLList;

  class GraphQLNonNull {
    constructor(ofType) {
      isNullableType(ofType) || (0, _devAssert.devAssert)(false, `Expected ${(0, _inspect.inspect)(ofType)} to be a GraphQL nullable type.`);
      this.ofType = ofType;
    }
    get [Symbol.toStringTag]() {
      return "GraphQLNonNull";
    }
    toString() {
      return String(this.ofType) + "!";
    }
    toJSON() {
      return this.toString();
    }
  }
  exports.GraphQLNonNull = GraphQLNonNull;
  function isWrappingType(type) {
    return isListType(type) || isNonNullType(type);
  }
  function assertWrappingType(type) {
    if (!isWrappingType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL wrapping type.`);
    }
    return type;
  }
  function isNullableType(type) {
    return isType(type) && !isNonNullType(type);
  }
  function assertNullableType(type) {
    if (!isNullableType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL nullable type.`);
    }
    return type;
  }
  function getNullableType(type) {
    if (type) {
      return isNonNullType(type) ? type.ofType : type;
    }
  }
  function isNamedType(type) {
    return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type);
  }
  function assertNamedType(type) {
    if (!isNamedType(type)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(type)} to be a GraphQL named type.`);
    }
    return type;
  }
  function getNamedType(type) {
    if (type) {
      let unwrappedType = type;
      while (isWrappingType(unwrappedType)) {
        unwrappedType = unwrappedType.ofType;
      }
      return unwrappedType;
    }
  }
  function resolveReadonlyArrayThunk(thunk) {
    return typeof thunk === "function" ? thunk() : thunk;
  }
  function resolveObjMapThunk(thunk) {
    return typeof thunk === "function" ? thunk() : thunk;
  }

  class GraphQLScalarType {
    constructor(config) {
      var _config$parseValue, _config$serialize, _config$parseLiteral, _config$extensionASTN;
      const parseValue2 = (_config$parseValue = config.parseValue) !== null && _config$parseValue !== undefined ? _config$parseValue : _identityFunc.identityFunc;
      this.name = (0, _assertName.assertName)(config.name);
      this.description = config.description;
      this.specifiedByURL = config.specifiedByURL;
      this.serialize = (_config$serialize = config.serialize) !== null && _config$serialize !== undefined ? _config$serialize : _identityFunc.identityFunc;
      this.parseValue = parseValue2;
      this.parseLiteral = (_config$parseLiteral = config.parseLiteral) !== null && _config$parseLiteral !== undefined ? _config$parseLiteral : (node, variables) => parseValue2((0, _valueFromASTUntyped.valueFromASTUntyped)(node, variables));
      this.extensions = (0, _toObjMap.toObjMap)(config.extensions);
      this.astNode = config.astNode;
      this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== undefined ? _config$extensionASTN : [];
      config.specifiedByURL == null || typeof config.specifiedByURL === "string" || (0, _devAssert.devAssert)(false, `${this.name} must provide "specifiedByURL" as a string, ` + `but got: ${(0, _inspect.inspect)(config.specifiedByURL)}.`);
      config.serialize == null || typeof config.serialize === "function" || (0, _devAssert.devAssert)(false, `${this.name} must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.`);
      if (config.parseLiteral) {
        typeof config.parseValue === "function" && typeof config.parseLiteral === "function" || (0, _devAssert.devAssert)(false, `${this.name} must provide both "parseValue" and "parseLiteral" functions.`);
      }
    }
    get [Symbol.toStringTag]() {
      return "GraphQLScalarType";
    }
    toConfig() {
      return {
        name: this.name,
        description: this.description,
        specifiedByURL: this.specifiedByURL,
        serialize: this.serialize,
        parseValue: this.parseValue,
        parseLiteral: this.parseLiteral,
        extensions: this.extensions,
        astNode: this.astNode,
        extensionASTNodes: this.extensionASTNodes
      };
    }
    toString() {
      return this.name;
    }
    toJSON() {
      return this.toString();
    }
  }
  exports.GraphQLScalarType = GraphQLScalarType;

  class GraphQLObjectType {
    constructor(config) {
      var _config$extensionASTN2;
      this.name = (0, _assertName.assertName)(config.name);
      this.description = config.description;
      this.isTypeOf = config.isTypeOf;
      this.extensions = (0, _toObjMap.toObjMap)(config.extensions);
      this.astNode = config.astNode;
      this.extensionASTNodes = (_config$extensionASTN2 = config.extensionASTNodes) !== null && _config$extensionASTN2 !== undefined ? _config$extensionASTN2 : [];
      this._fields = () => defineFieldMap(config);
      this._interfaces = () => defineInterfaces(config);
      config.isTypeOf == null || typeof config.isTypeOf === "function" || (0, _devAssert.devAssert)(false, `${this.name} must provide "isTypeOf" as a function, ` + `but got: ${(0, _inspect.inspect)(config.isTypeOf)}.`);
    }
    get [Symbol.toStringTag]() {
      return "GraphQLObjectType";
    }
    getFields() {
      if (typeof this._fields === "function") {
        this._fields = this._fields();
      }
      return this._fields;
    }
    getInterfaces() {
      if (typeof this._interfaces === "function") {
        this._interfaces = this._interfaces();
      }
      return this._interfaces;
    }
    toConfig() {
      return {
        name: this.name,
        description: this.description,
        interfaces: this.getInterfaces(),
        fields: fieldsToFieldsConfig(this.getFields()),
        isTypeOf: this.isTypeOf,
        extensions: this.extensions,
        astNode: this.astNode,
        extensionASTNodes: this.extensionASTNodes
      };
    }
    toString() {
      return this.name;
    }
    toJSON() {
      return this.toString();
    }
  }
  exports.GraphQLObjectType = GraphQLObjectType;
  function defineInterfaces(config) {
    var _config$interfaces;
    const interfaces = resolveReadonlyArrayThunk((_config$interfaces = config.interfaces) !== null && _config$interfaces !== undefined ? _config$interfaces : []);
    Array.isArray(interfaces) || (0, _devAssert.devAssert)(false, `${config.name} interfaces must be an Array or a function which returns an Array.`);
    return interfaces;
  }
  function defineFieldMap(config) {
    const fieldMap = resolveObjMapThunk(config.fields);
    isPlainObj(fieldMap) || (0, _devAssert.devAssert)(false, `${config.name} fields must be an object with field names as keys or a function which returns such an object.`);
    return (0, _mapValue.mapValue)(fieldMap, (fieldConfig, fieldName) => {
      var _fieldConfig$args;
      isPlainObj(fieldConfig) || (0, _devAssert.devAssert)(false, `${config.name}.${fieldName} field config must be an object.`);
      fieldConfig.resolve == null || typeof fieldConfig.resolve === "function" || (0, _devAssert.devAssert)(false, `${config.name}.${fieldName} field resolver must be a function if ` + `provided, but got: ${(0, _inspect.inspect)(fieldConfig.resolve)}.`);
      const argsConfig = (_fieldConfig$args = fieldConfig.args) !== null && _fieldConfig$args !== undefined ? _fieldConfig$args : {};
      isPlainObj(argsConfig) || (0, _devAssert.devAssert)(false, `${config.name}.${fieldName} args must be an object with argument names as keys.`);
      return {
        name: (0, _assertName.assertName)(fieldName),
        description: fieldConfig.description,
        type: fieldConfig.type,
        args: defineArguments(argsConfig),
        resolve: fieldConfig.resolve,
        subscribe: fieldConfig.subscribe,
        deprecationReason: fieldConfig.deprecationReason,
        extensions: (0, _toObjMap.toObjMap)(fieldConfig.extensions),
        astNode: fieldConfig.astNode
      };
    });
  }
  function defineArguments(config) {
    return Object.entries(config).map(([argName, argConfig]) => ({
      name: (0, _assertName.assertName)(argName),
      description: argConfig.description,
      type: argConfig.type,
      defaultValue: argConfig.defaultValue,
      deprecationReason: argConfig.deprecationReason,
      extensions: (0, _toObjMap.toObjMap)(argConfig.extensions),
      astNode: argConfig.astNode
    }));
  }
  function isPlainObj(obj) {
    return (0, _isObjectLike.isObjectLike)(obj) && !Array.isArray(obj);
  }
  function fieldsToFieldsConfig(fields) {
    return (0, _mapValue.mapValue)(fields, (field) => ({
      description: field.description,
      type: field.type,
      args: argsToArgsConfig(field.args),
      resolve: field.resolve,
      subscribe: field.subscribe,
      deprecationReason: field.deprecationReason,
      extensions: field.extensions,
      astNode: field.astNode
    }));
  }
  function argsToArgsConfig(args) {
    return (0, _keyValMap.keyValMap)(args, (arg) => arg.name, (arg) => ({
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      deprecationReason: arg.deprecationReason,
      extensions: arg.extensions,
      astNode: arg.astNode
    }));
  }
  function isRequiredArgument(arg) {
    return isNonNullType(arg.type) && arg.defaultValue === undefined;
  }

  class GraphQLInterfaceType {
    constructor(config) {
      var _config$extensionASTN3;
      this.name = (0, _assertName.assertName)(config.name);
      this.description = config.description;
      this.resolveType = config.resolveType;
      this.extensions = (0, _toObjMap.toObjMap)(config.extensions);
      this.astNode = config.astNode;
      this.extensionASTNodes = (_config$extensionASTN3 = config.extensionASTNodes) !== null && _config$extensionASTN3 !== undefined ? _config$extensionASTN3 : [];
      this._fields = defineFieldMap.bind(undefined, config);
      this._interfaces = defineInterfaces.bind(undefined, config);
      config.resolveType == null || typeof config.resolveType === "function" || (0, _devAssert.devAssert)(false, `${this.name} must provide "resolveType" as a function, ` + `but got: ${(0, _inspect.inspect)(config.resolveType)}.`);
    }
    get [Symbol.toStringTag]() {
      return "GraphQLInterfaceType";
    }
    getFields() {
      if (typeof this._fields === "function") {
        this._fields = this._fields();
      }
      return this._fields;
    }
    getInterfaces() {
      if (typeof this._interfaces === "function") {
        this._interfaces = this._interfaces();
      }
      return this._interfaces;
    }
    toConfig() {
      return {
        name: this.name,
        description: this.description,
        interfaces: this.getInterfaces(),
        fields: fieldsToFieldsConfig(this.getFields()),
        resolveType: this.resolveType,
        extensions: this.extensions,
        astNode: this.astNode,
        extensionASTNodes: this.extensionASTNodes
      };
    }
    toString() {
      return this.name;
    }
    toJSON() {
      return this.toString();
    }
  }
  exports.GraphQLInterfaceType = GraphQLInterfaceType;

  class GraphQLUnionType {
    constructor(config) {
      var _config$extensionASTN4;
      this.name = (0, _assertName.assertName)(config.name);
      this.description = config.description;
      this.resolveType = config.resolveType;
      this.extensions = (0, _toObjMap.toObjMap)(config.extensions);
      this.astNode = config.astNode;
      this.extensionASTNodes = (_config$extensionASTN4 = config.extensionASTNodes) !== null && _config$extensionASTN4 !== undefined ? _config$extensionASTN4 : [];
      this._types = defineTypes.bind(undefined, config);
      config.resolveType == null || typeof config.resolveType === "function" || (0, _devAssert.devAssert)(false, `${this.name} must provide "resolveType" as a function, ` + `but got: ${(0, _inspect.inspect)(config.resolveType)}.`);
    }
    get [Symbol.toStringTag]() {
      return "GraphQLUnionType";
    }
    getTypes() {
      if (typeof this._types === "function") {
        this._types = this._types();
      }
      return this._types;
    }
    toConfig() {
      return {
        name: this.name,
        description: this.description,
        types: this.getTypes(),
        resolveType: this.resolveType,
        extensions: this.extensions,
        astNode: this.astNode,
        extensionASTNodes: this.extensionASTNodes
      };
    }
    toString() {
      return this.name;
    }
    toJSON() {
      return this.toString();
    }
  }
  exports.GraphQLUnionType = GraphQLUnionType;
  function defineTypes(config) {
    const types2 = resolveReadonlyArrayThunk(config.types);
    Array.isArray(types2) || (0, _devAssert.devAssert)(false, `Must provide Array of types or a function which returns such an array for Union ${config.name}.`);
    return types2;
  }

  class GraphQLEnumType {
    constructor(config) {
      var _config$extensionASTN5;
      this.name = (0, _assertName.assertName)(config.name);
      this.description = config.description;
      this.extensions = (0, _toObjMap.toObjMap)(config.extensions);
      this.astNode = config.astNode;
      this.extensionASTNodes = (_config$extensionASTN5 = config.extensionASTNodes) !== null && _config$extensionASTN5 !== undefined ? _config$extensionASTN5 : [];
      this._values = typeof config.values === "function" ? config.values : defineEnumValues(this.name, config.values);
      this._valueLookup = null;
      this._nameLookup = null;
    }
    get [Symbol.toStringTag]() {
      return "GraphQLEnumType";
    }
    getValues() {
      if (typeof this._values === "function") {
        this._values = defineEnumValues(this.name, this._values());
      }
      return this._values;
    }
    getValue(name) {
      if (this._nameLookup === null) {
        this._nameLookup = (0, _keyMap.keyMap)(this.getValues(), (value) => value.name);
      }
      return this._nameLookup[name];
    }
    serialize(outputValue) {
      if (this._valueLookup === null) {
        this._valueLookup = new Map(this.getValues().map((enumValue2) => [enumValue2.value, enumValue2]));
      }
      const enumValue = this._valueLookup.get(outputValue);
      if (enumValue === undefined) {
        throw new _GraphQLError.GraphQLError(`Enum "${this.name}" cannot represent value: ${(0, _inspect.inspect)(outputValue)}`);
      }
      return enumValue.name;
    }
    parseValue(inputValue) {
      if (typeof inputValue !== "string") {
        const valueStr = (0, _inspect.inspect)(inputValue);
        throw new _GraphQLError.GraphQLError(`Enum "${this.name}" cannot represent non-string value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr));
      }
      const enumValue = this.getValue(inputValue);
      if (enumValue == null) {
        throw new _GraphQLError.GraphQLError(`Value "${inputValue}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, inputValue));
      }
      return enumValue.value;
    }
    parseLiteral(valueNode, _variables) {
      if (valueNode.kind !== _kinds.Kind.ENUM) {
        const valueStr = (0, _printer.print)(valueNode);
        throw new _GraphQLError.GraphQLError(`Enum "${this.name}" cannot represent non-enum value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr), {
          nodes: valueNode
        });
      }
      const enumValue = this.getValue(valueNode.value);
      if (enumValue == null) {
        const valueStr = (0, _printer.print)(valueNode);
        throw new _GraphQLError.GraphQLError(`Value "${valueStr}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, valueStr), {
          nodes: valueNode
        });
      }
      return enumValue.value;
    }
    toConfig() {
      const values = (0, _keyValMap.keyValMap)(this.getValues(), (value) => value.name, (value) => ({
        description: value.description,
        value: value.value,
        deprecationReason: value.deprecationReason,
        extensions: value.extensions,
        astNode: value.astNode
      }));
      return {
        name: this.name,
        description: this.description,
        values,
        extensions: this.extensions,
        astNode: this.astNode,
        extensionASTNodes: this.extensionASTNodes
      };
    }
    toString() {
      return this.name;
    }
    toJSON() {
      return this.toString();
    }
  }
  exports.GraphQLEnumType = GraphQLEnumType;
  function didYouMeanEnumValue(enumType2, unknownValueStr) {
    const allNames = enumType2.getValues().map((value) => value.name);
    const suggestedValues = (0, _suggestionList.suggestionList)(unknownValueStr, allNames);
    return (0, _didYouMean.didYouMean)("the enum value", suggestedValues);
  }
  function defineEnumValues(typeName, valueMap) {
    isPlainObj(valueMap) || (0, _devAssert.devAssert)(false, `${typeName} values must be an object with value names as keys.`);
    return Object.entries(valueMap).map(([valueName, valueConfig]) => {
      isPlainObj(valueConfig) || (0, _devAssert.devAssert)(false, `${typeName}.${valueName} must refer to an object with a "value" key ` + `representing an internal value but got: ${(0, _inspect.inspect)(valueConfig)}.`);
      return {
        name: (0, _assertName.assertEnumValueName)(valueName),
        description: valueConfig.description,
        value: valueConfig.value !== undefined ? valueConfig.value : valueName,
        deprecationReason: valueConfig.deprecationReason,
        extensions: (0, _toObjMap.toObjMap)(valueConfig.extensions),
        astNode: valueConfig.astNode
      };
    });
  }

  class GraphQLInputObjectType {
    constructor(config) {
      var _config$extensionASTN6, _config$isOneOf;
      this.name = (0, _assertName.assertName)(config.name);
      this.description = config.description;
      this.extensions = (0, _toObjMap.toObjMap)(config.extensions);
      this.astNode = config.astNode;
      this.extensionASTNodes = (_config$extensionASTN6 = config.extensionASTNodes) !== null && _config$extensionASTN6 !== undefined ? _config$extensionASTN6 : [];
      this.isOneOf = (_config$isOneOf = config.isOneOf) !== null && _config$isOneOf !== undefined ? _config$isOneOf : false;
      this._fields = defineInputFieldMap.bind(undefined, config);
    }
    get [Symbol.toStringTag]() {
      return "GraphQLInputObjectType";
    }
    getFields() {
      if (typeof this._fields === "function") {
        this._fields = this._fields();
      }
      return this._fields;
    }
    toConfig() {
      const fields = (0, _mapValue.mapValue)(this.getFields(), (field) => ({
        description: field.description,
        type: field.type,
        defaultValue: field.defaultValue,
        deprecationReason: field.deprecationReason,
        extensions: field.extensions,
        astNode: field.astNode
      }));
      return {
        name: this.name,
        description: this.description,
        fields,
        extensions: this.extensions,
        astNode: this.astNode,
        extensionASTNodes: this.extensionASTNodes,
        isOneOf: this.isOneOf
      };
    }
    toString() {
      return this.name;
    }
    toJSON() {
      return this.toString();
    }
  }
  exports.GraphQLInputObjectType = GraphQLInputObjectType;
  function defineInputFieldMap(config) {
    const fieldMap = resolveObjMapThunk(config.fields);
    isPlainObj(fieldMap) || (0, _devAssert.devAssert)(false, `${config.name} fields must be an object with field names as keys or a function which returns such an object.`);
    return (0, _mapValue.mapValue)(fieldMap, (fieldConfig, fieldName) => {
      !("resolve" in fieldConfig) || (0, _devAssert.devAssert)(false, `${config.name}.${fieldName} field has a resolve property, but Input Types cannot define resolvers.`);
      return {
        name: (0, _assertName.assertName)(fieldName),
        description: fieldConfig.description,
        type: fieldConfig.type,
        defaultValue: fieldConfig.defaultValue,
        deprecationReason: fieldConfig.deprecationReason,
        extensions: (0, _toObjMap.toObjMap)(fieldConfig.extensions),
        astNode: fieldConfig.astNode
      };
    });
  }
  function isRequiredInputField(field) {
    return isNonNullType(field.type) && field.defaultValue === undefined;
  }
});

// node_modules/graphql/utilities/typeComparators.js
var require_typeComparators = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.doTypesOverlap = doTypesOverlap;
  exports.isEqualType = isEqualType;
  exports.isTypeSubTypeOf = isTypeSubTypeOf;
  var _definition = require_definition();
  function isEqualType(typeA, typeB) {
    if (typeA === typeB) {
      return true;
    }
    if ((0, _definition.isNonNullType)(typeA) && (0, _definition.isNonNullType)(typeB)) {
      return isEqualType(typeA.ofType, typeB.ofType);
    }
    if ((0, _definition.isListType)(typeA) && (0, _definition.isListType)(typeB)) {
      return isEqualType(typeA.ofType, typeB.ofType);
    }
    return false;
  }
  function isTypeSubTypeOf(schema, maybeSubType, superType) {
    if (maybeSubType === superType) {
      return true;
    }
    if ((0, _definition.isNonNullType)(superType)) {
      if ((0, _definition.isNonNullType)(maybeSubType)) {
        return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
      }
      return false;
    }
    if ((0, _definition.isNonNullType)(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
    }
    if ((0, _definition.isListType)(superType)) {
      if ((0, _definition.isListType)(maybeSubType)) {
        return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
      }
      return false;
    }
    if ((0, _definition.isListType)(maybeSubType)) {
      return false;
    }
    return (0, _definition.isAbstractType)(superType) && ((0, _definition.isInterfaceType)(maybeSubType) || (0, _definition.isObjectType)(maybeSubType)) && schema.isSubType(superType, maybeSubType);
  }
  function doTypesOverlap(schema, typeA, typeB) {
    if (typeA === typeB) {
      return true;
    }
    if ((0, _definition.isAbstractType)(typeA)) {
      if ((0, _definition.isAbstractType)(typeB)) {
        return schema.getPossibleTypes(typeA).some((type) => schema.isSubType(typeB, type));
      }
      return schema.isSubType(typeA, typeB);
    }
    if ((0, _definition.isAbstractType)(typeB)) {
      return schema.isSubType(typeB, typeA);
    }
    return false;
  }
});

// node_modules/graphql/type/scalars.js
var require_scalars = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GraphQLString = exports.GraphQLInt = exports.GraphQLID = exports.GraphQLFloat = exports.GraphQLBoolean = exports.GRAPHQL_MIN_INT = exports.GRAPHQL_MAX_INT = undefined;
  exports.isSpecifiedScalarType = isSpecifiedScalarType;
  exports.specifiedScalarTypes = undefined;
  var _inspect = require_inspect();
  var _isObjectLike = require_isObjectLike();
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _printer = require_printer();
  var _definition = require_definition();
  var GRAPHQL_MAX_INT = 2147483647;
  exports.GRAPHQL_MAX_INT = GRAPHQL_MAX_INT;
  var GRAPHQL_MIN_INT = -2147483648;
  exports.GRAPHQL_MIN_INT = GRAPHQL_MIN_INT;
  var GraphQLInt = new _definition.GraphQLScalarType({
    name: "Int",
    description: "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
    serialize(outputValue) {
      const coercedValue = serializeObject(outputValue);
      if (typeof coercedValue === "boolean") {
        return coercedValue ? 1 : 0;
      }
      let num = coercedValue;
      if (typeof coercedValue === "string" && coercedValue !== "") {
        num = Number(coercedValue);
      }
      if (typeof num !== "number" || !Number.isInteger(num)) {
        throw new _GraphQLError.GraphQLError(`Int cannot represent non-integer value: ${(0, _inspect.inspect)(coercedValue)}`);
      }
      if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
        throw new _GraphQLError.GraphQLError("Int cannot represent non 32-bit signed integer value: " + (0, _inspect.inspect)(coercedValue));
      }
      return num;
    },
    parseValue(inputValue) {
      if (typeof inputValue !== "number" || !Number.isInteger(inputValue)) {
        throw new _GraphQLError.GraphQLError(`Int cannot represent non-integer value: ${(0, _inspect.inspect)(inputValue)}`);
      }
      if (inputValue > GRAPHQL_MAX_INT || inputValue < GRAPHQL_MIN_INT) {
        throw new _GraphQLError.GraphQLError(`Int cannot represent non 32-bit signed integer value: ${inputValue}`);
      }
      return inputValue;
    },
    parseLiteral(valueNode) {
      if (valueNode.kind !== _kinds.Kind.INT) {
        throw new _GraphQLError.GraphQLError(`Int cannot represent non-integer value: ${(0, _printer.print)(valueNode)}`, {
          nodes: valueNode
        });
      }
      const num = parseInt(valueNode.value, 10);
      if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
        throw new _GraphQLError.GraphQLError(`Int cannot represent non 32-bit signed integer value: ${valueNode.value}`, {
          nodes: valueNode
        });
      }
      return num;
    }
  });
  exports.GraphQLInt = GraphQLInt;
  var GraphQLFloat = new _definition.GraphQLScalarType({
    name: "Float",
    description: "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).",
    serialize(outputValue) {
      const coercedValue = serializeObject(outputValue);
      if (typeof coercedValue === "boolean") {
        return coercedValue ? 1 : 0;
      }
      let num = coercedValue;
      if (typeof coercedValue === "string" && coercedValue !== "") {
        num = Number(coercedValue);
      }
      if (typeof num !== "number" || !Number.isFinite(num)) {
        throw new _GraphQLError.GraphQLError(`Float cannot represent non numeric value: ${(0, _inspect.inspect)(coercedValue)}`);
      }
      return num;
    },
    parseValue(inputValue) {
      if (typeof inputValue !== "number" || !Number.isFinite(inputValue)) {
        throw new _GraphQLError.GraphQLError(`Float cannot represent non numeric value: ${(0, _inspect.inspect)(inputValue)}`);
      }
      return inputValue;
    },
    parseLiteral(valueNode) {
      if (valueNode.kind !== _kinds.Kind.FLOAT && valueNode.kind !== _kinds.Kind.INT) {
        throw new _GraphQLError.GraphQLError(`Float cannot represent non numeric value: ${(0, _printer.print)(valueNode)}`, valueNode);
      }
      return parseFloat(valueNode.value);
    }
  });
  exports.GraphQLFloat = GraphQLFloat;
  var GraphQLString = new _definition.GraphQLScalarType({
    name: "String",
    description: "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
    serialize(outputValue) {
      const coercedValue = serializeObject(outputValue);
      if (typeof coercedValue === "string") {
        return coercedValue;
      }
      if (typeof coercedValue === "boolean") {
        return coercedValue ? "true" : "false";
      }
      if (typeof coercedValue === "number" && Number.isFinite(coercedValue)) {
        return coercedValue.toString();
      }
      throw new _GraphQLError.GraphQLError(`String cannot represent value: ${(0, _inspect.inspect)(outputValue)}`);
    },
    parseValue(inputValue) {
      if (typeof inputValue !== "string") {
        throw new _GraphQLError.GraphQLError(`String cannot represent a non string value: ${(0, _inspect.inspect)(inputValue)}`);
      }
      return inputValue;
    },
    parseLiteral(valueNode) {
      if (valueNode.kind !== _kinds.Kind.STRING) {
        throw new _GraphQLError.GraphQLError(`String cannot represent a non string value: ${(0, _printer.print)(valueNode)}`, {
          nodes: valueNode
        });
      }
      return valueNode.value;
    }
  });
  exports.GraphQLString = GraphQLString;
  var GraphQLBoolean = new _definition.GraphQLScalarType({
    name: "Boolean",
    description: "The `Boolean` scalar type represents `true` or `false`.",
    serialize(outputValue) {
      const coercedValue = serializeObject(outputValue);
      if (typeof coercedValue === "boolean") {
        return coercedValue;
      }
      if (Number.isFinite(coercedValue)) {
        return coercedValue !== 0;
      }
      throw new _GraphQLError.GraphQLError(`Boolean cannot represent a non boolean value: ${(0, _inspect.inspect)(coercedValue)}`);
    },
    parseValue(inputValue) {
      if (typeof inputValue !== "boolean") {
        throw new _GraphQLError.GraphQLError(`Boolean cannot represent a non boolean value: ${(0, _inspect.inspect)(inputValue)}`);
      }
      return inputValue;
    },
    parseLiteral(valueNode) {
      if (valueNode.kind !== _kinds.Kind.BOOLEAN) {
        throw new _GraphQLError.GraphQLError(`Boolean cannot represent a non boolean value: ${(0, _printer.print)(valueNode)}`, {
          nodes: valueNode
        });
      }
      return valueNode.value;
    }
  });
  exports.GraphQLBoolean = GraphQLBoolean;
  var GraphQLID = new _definition.GraphQLScalarType({
    name: "ID",
    description: 'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
    serialize(outputValue) {
      const coercedValue = serializeObject(outputValue);
      if (typeof coercedValue === "string") {
        return coercedValue;
      }
      if (Number.isInteger(coercedValue)) {
        return String(coercedValue);
      }
      throw new _GraphQLError.GraphQLError(`ID cannot represent value: ${(0, _inspect.inspect)(outputValue)}`);
    },
    parseValue(inputValue) {
      if (typeof inputValue === "string") {
        return inputValue;
      }
      if (typeof inputValue === "number" && Number.isInteger(inputValue)) {
        return inputValue.toString();
      }
      throw new _GraphQLError.GraphQLError(`ID cannot represent value: ${(0, _inspect.inspect)(inputValue)}`);
    },
    parseLiteral(valueNode) {
      if (valueNode.kind !== _kinds.Kind.STRING && valueNode.kind !== _kinds.Kind.INT) {
        throw new _GraphQLError.GraphQLError("ID cannot represent a non-string and non-integer value: " + (0, _printer.print)(valueNode), {
          nodes: valueNode
        });
      }
      return valueNode.value;
    }
  });
  exports.GraphQLID = GraphQLID;
  var specifiedScalarTypes = Object.freeze([
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLID
  ]);
  exports.specifiedScalarTypes = specifiedScalarTypes;
  function isSpecifiedScalarType(type) {
    return specifiedScalarTypes.some(({ name }) => type.name === name);
  }
  function serializeObject(outputValue) {
    if ((0, _isObjectLike.isObjectLike)(outputValue)) {
      if (typeof outputValue.valueOf === "function") {
        const valueOfResult = outputValue.valueOf();
        if (!(0, _isObjectLike.isObjectLike)(valueOfResult)) {
          return valueOfResult;
        }
      }
      if (typeof outputValue.toJSON === "function") {
        return outputValue.toJSON();
      }
    }
    return outputValue;
  }
});

// node_modules/graphql/type/directives.js
var require_directives = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GraphQLSpecifiedByDirective = exports.GraphQLSkipDirective = exports.GraphQLOneOfDirective = exports.GraphQLIncludeDirective = exports.GraphQLDirective = exports.GraphQLDeprecatedDirective = exports.DEFAULT_DEPRECATION_REASON = undefined;
  exports.assertDirective = assertDirective;
  exports.isDirective = isDirective;
  exports.isSpecifiedDirective = isSpecifiedDirective;
  exports.specifiedDirectives = undefined;
  var _devAssert = require_devAssert();
  var _inspect = require_inspect();
  var _instanceOf = require_instanceOf();
  var _isObjectLike = require_isObjectLike();
  var _toObjMap = require_toObjMap();
  var _directiveLocation = require_directiveLocation();
  var _assertName = require_assertName();
  var _definition = require_definition();
  var _scalars = require_scalars();
  function isDirective(directive) {
    return (0, _instanceOf.instanceOf)(directive, GraphQLDirective);
  }
  function assertDirective(directive) {
    if (!isDirective(directive)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(directive)} to be a GraphQL directive.`);
    }
    return directive;
  }

  class GraphQLDirective {
    constructor(config) {
      var _config$isRepeatable, _config$args;
      this.name = (0, _assertName.assertName)(config.name);
      this.description = config.description;
      this.locations = config.locations;
      this.isRepeatable = (_config$isRepeatable = config.isRepeatable) !== null && _config$isRepeatable !== undefined ? _config$isRepeatable : false;
      this.extensions = (0, _toObjMap.toObjMap)(config.extensions);
      this.astNode = config.astNode;
      Array.isArray(config.locations) || (0, _devAssert.devAssert)(false, `@${config.name} locations must be an Array.`);
      const args = (_config$args = config.args) !== null && _config$args !== undefined ? _config$args : {};
      (0, _isObjectLike.isObjectLike)(args) && !Array.isArray(args) || (0, _devAssert.devAssert)(false, `@${config.name} args must be an object with argument names as keys.`);
      this.args = (0, _definition.defineArguments)(args);
    }
    get [Symbol.toStringTag]() {
      return "GraphQLDirective";
    }
    toConfig() {
      return {
        name: this.name,
        description: this.description,
        locations: this.locations,
        args: (0, _definition.argsToArgsConfig)(this.args),
        isRepeatable: this.isRepeatable,
        extensions: this.extensions,
        astNode: this.astNode
      };
    }
    toString() {
      return "@" + this.name;
    }
    toJSON() {
      return this.toString();
    }
  }
  exports.GraphQLDirective = GraphQLDirective;
  var GraphQLIncludeDirective = new GraphQLDirective({
    name: "include",
    description: "Directs the executor to include this field or fragment only when the `if` argument is true.",
    locations: [
      _directiveLocation.DirectiveLocation.FIELD,
      _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD,
      _directiveLocation.DirectiveLocation.INLINE_FRAGMENT
    ],
    args: {
      if: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLBoolean),
        description: "Included when true."
      }
    }
  });
  exports.GraphQLIncludeDirective = GraphQLIncludeDirective;
  var GraphQLSkipDirective = new GraphQLDirective({
    name: "skip",
    description: "Directs the executor to skip this field or fragment when the `if` argument is true.",
    locations: [
      _directiveLocation.DirectiveLocation.FIELD,
      _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD,
      _directiveLocation.DirectiveLocation.INLINE_FRAGMENT
    ],
    args: {
      if: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLBoolean),
        description: "Skipped when true."
      }
    }
  });
  exports.GraphQLSkipDirective = GraphQLSkipDirective;
  var DEFAULT_DEPRECATION_REASON = "No longer supported";
  exports.DEFAULT_DEPRECATION_REASON = DEFAULT_DEPRECATION_REASON;
  var GraphQLDeprecatedDirective = new GraphQLDirective({
    name: "deprecated",
    description: "Marks an element of a GraphQL schema as no longer supported.",
    locations: [
      _directiveLocation.DirectiveLocation.FIELD_DEFINITION,
      _directiveLocation.DirectiveLocation.ARGUMENT_DEFINITION,
      _directiveLocation.DirectiveLocation.INPUT_FIELD_DEFINITION,
      _directiveLocation.DirectiveLocation.ENUM_VALUE
    ],
    args: {
      reason: {
        type: _scalars.GraphQLString,
        description: "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).",
        defaultValue: DEFAULT_DEPRECATION_REASON
      }
    }
  });
  exports.GraphQLDeprecatedDirective = GraphQLDeprecatedDirective;
  var GraphQLSpecifiedByDirective = new GraphQLDirective({
    name: "specifiedBy",
    description: "Exposes a URL that specifies the behavior of this scalar.",
    locations: [_directiveLocation.DirectiveLocation.SCALAR],
    args: {
      url: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLString),
        description: "The URL that specifies the behavior of this scalar."
      }
    }
  });
  exports.GraphQLSpecifiedByDirective = GraphQLSpecifiedByDirective;
  var GraphQLOneOfDirective = new GraphQLDirective({
    name: "oneOf",
    description: "Indicates exactly one field must be supplied and this field must not be `null`.",
    locations: [_directiveLocation.DirectiveLocation.INPUT_OBJECT],
    args: {}
  });
  exports.GraphQLOneOfDirective = GraphQLOneOfDirective;
  var specifiedDirectives = Object.freeze([
    GraphQLIncludeDirective,
    GraphQLSkipDirective,
    GraphQLDeprecatedDirective,
    GraphQLSpecifiedByDirective,
    GraphQLOneOfDirective
  ]);
  exports.specifiedDirectives = specifiedDirectives;
  function isSpecifiedDirective(directive) {
    return specifiedDirectives.some(({ name }) => name === directive.name);
  }
});

// node_modules/graphql/jsutils/isIterableObject.js
var require_isIterableObject = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isIterableObject = isIterableObject;
  function isIterableObject(maybeIterable) {
    return typeof maybeIterable === "object" && typeof (maybeIterable === null || maybeIterable === undefined ? undefined : maybeIterable[Symbol.iterator]) === "function";
  }
});

// node_modules/graphql/utilities/astFromValue.js
var require_astFromValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.astFromValue = astFromValue;
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _isIterableObject = require_isIterableObject();
  var _isObjectLike = require_isObjectLike();
  var _kinds = require_kinds();
  var _definition = require_definition();
  var _scalars = require_scalars();
  function astFromValue(value, type) {
    if ((0, _definition.isNonNullType)(type)) {
      const astValue = astFromValue(value, type.ofType);
      if ((astValue === null || astValue === undefined ? undefined : astValue.kind) === _kinds.Kind.NULL) {
        return null;
      }
      return astValue;
    }
    if (value === null) {
      return {
        kind: _kinds.Kind.NULL
      };
    }
    if (value === undefined) {
      return null;
    }
    if ((0, _definition.isListType)(type)) {
      const itemType = type.ofType;
      if ((0, _isIterableObject.isIterableObject)(value)) {
        const valuesNodes = [];
        for (const item of value) {
          const itemNode = astFromValue(item, itemType);
          if (itemNode != null) {
            valuesNodes.push(itemNode);
          }
        }
        return {
          kind: _kinds.Kind.LIST,
          values: valuesNodes
        };
      }
      return astFromValue(value, itemType);
    }
    if ((0, _definition.isInputObjectType)(type)) {
      if (!(0, _isObjectLike.isObjectLike)(value)) {
        return null;
      }
      const fieldNodes = [];
      for (const field of Object.values(type.getFields())) {
        const fieldValue = astFromValue(value[field.name], field.type);
        if (fieldValue) {
          fieldNodes.push({
            kind: _kinds.Kind.OBJECT_FIELD,
            name: {
              kind: _kinds.Kind.NAME,
              value: field.name
            },
            value: fieldValue
          });
        }
      }
      return {
        kind: _kinds.Kind.OBJECT,
        fields: fieldNodes
      };
    }
    if ((0, _definition.isLeafType)(type)) {
      const serialized = type.serialize(value);
      if (serialized == null) {
        return null;
      }
      if (typeof serialized === "boolean") {
        return {
          kind: _kinds.Kind.BOOLEAN,
          value: serialized
        };
      }
      if (typeof serialized === "number" && Number.isFinite(serialized)) {
        const stringNum = String(serialized);
        return integerStringRegExp.test(stringNum) ? {
          kind: _kinds.Kind.INT,
          value: stringNum
        } : {
          kind: _kinds.Kind.FLOAT,
          value: stringNum
        };
      }
      if (typeof serialized === "string") {
        if ((0, _definition.isEnumType)(type)) {
          return {
            kind: _kinds.Kind.ENUM,
            value: serialized
          };
        }
        if (type === _scalars.GraphQLID && integerStringRegExp.test(serialized)) {
          return {
            kind: _kinds.Kind.INT,
            value: serialized
          };
        }
        return {
          kind: _kinds.Kind.STRING,
          value: serialized
        };
      }
      throw new TypeError(`Cannot convert value to AST: ${(0, _inspect.inspect)(serialized)}.`);
    }
    (0, _invariant.invariant)(false, "Unexpected input type: " + (0, _inspect.inspect)(type));
  }
  var integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;
});

// node_modules/graphql/type/introspection.js
var require_introspection = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.introspectionTypes = exports.__TypeKind = exports.__Type = exports.__Schema = exports.__InputValue = exports.__Field = exports.__EnumValue = exports.__DirectiveLocation = exports.__Directive = exports.TypeNameMetaFieldDef = exports.TypeMetaFieldDef = exports.TypeKind = exports.SchemaMetaFieldDef = undefined;
  exports.isIntrospectionType = isIntrospectionType;
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _directiveLocation = require_directiveLocation();
  var _printer = require_printer();
  var _astFromValue = require_astFromValue();
  var _definition = require_definition();
  var _scalars = require_scalars();
  var __Schema = new _definition.GraphQLObjectType({
    name: "__Schema",
    description: "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
    fields: () => ({
      description: {
        type: _scalars.GraphQLString,
        resolve: (schema) => schema.description
      },
      types: {
        description: "A list of all types supported by this server.",
        type: new _definition.GraphQLNonNull(new _definition.GraphQLList(new _definition.GraphQLNonNull(__Type))),
        resolve(schema) {
          return Object.values(schema.getTypeMap());
        }
      },
      queryType: {
        description: "The type that query operations will be rooted at.",
        type: new _definition.GraphQLNonNull(__Type),
        resolve: (schema) => schema.getQueryType()
      },
      mutationType: {
        description: "If this server supports mutation, the type that mutation operations will be rooted at.",
        type: __Type,
        resolve: (schema) => schema.getMutationType()
      },
      subscriptionType: {
        description: "If this server support subscription, the type that subscription operations will be rooted at.",
        type: __Type,
        resolve: (schema) => schema.getSubscriptionType()
      },
      directives: {
        description: "A list of all directives supported by this server.",
        type: new _definition.GraphQLNonNull(new _definition.GraphQLList(new _definition.GraphQLNonNull(__Directive))),
        resolve: (schema) => schema.getDirectives()
      }
    })
  });
  exports.__Schema = __Schema;
  var __Directive = new _definition.GraphQLObjectType({
    name: "__Directive",
    description: `A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.

In some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.`,
    fields: () => ({
      name: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLString),
        resolve: (directive) => directive.name
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: (directive) => directive.description
      },
      isRepeatable: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLBoolean),
        resolve: (directive) => directive.isRepeatable
      },
      locations: {
        type: new _definition.GraphQLNonNull(new _definition.GraphQLList(new _definition.GraphQLNonNull(__DirectiveLocation))),
        resolve: (directive) => directive.locations
      },
      args: {
        type: new _definition.GraphQLNonNull(new _definition.GraphQLList(new _definition.GraphQLNonNull(__InputValue))),
        args: {
          includeDeprecated: {
            type: _scalars.GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve(field, { includeDeprecated }) {
          return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
        }
      }
    })
  });
  exports.__Directive = __Directive;
  var __DirectiveLocation = new _definition.GraphQLEnumType({
    name: "__DirectiveLocation",
    description: "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
    values: {
      QUERY: {
        value: _directiveLocation.DirectiveLocation.QUERY,
        description: "Location adjacent to a query operation."
      },
      MUTATION: {
        value: _directiveLocation.DirectiveLocation.MUTATION,
        description: "Location adjacent to a mutation operation."
      },
      SUBSCRIPTION: {
        value: _directiveLocation.DirectiveLocation.SUBSCRIPTION,
        description: "Location adjacent to a subscription operation."
      },
      FIELD: {
        value: _directiveLocation.DirectiveLocation.FIELD,
        description: "Location adjacent to a field."
      },
      FRAGMENT_DEFINITION: {
        value: _directiveLocation.DirectiveLocation.FRAGMENT_DEFINITION,
        description: "Location adjacent to a fragment definition."
      },
      FRAGMENT_SPREAD: {
        value: _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD,
        description: "Location adjacent to a fragment spread."
      },
      INLINE_FRAGMENT: {
        value: _directiveLocation.DirectiveLocation.INLINE_FRAGMENT,
        description: "Location adjacent to an inline fragment."
      },
      VARIABLE_DEFINITION: {
        value: _directiveLocation.DirectiveLocation.VARIABLE_DEFINITION,
        description: "Location adjacent to a variable definition."
      },
      SCHEMA: {
        value: _directiveLocation.DirectiveLocation.SCHEMA,
        description: "Location adjacent to a schema definition."
      },
      SCALAR: {
        value: _directiveLocation.DirectiveLocation.SCALAR,
        description: "Location adjacent to a scalar definition."
      },
      OBJECT: {
        value: _directiveLocation.DirectiveLocation.OBJECT,
        description: "Location adjacent to an object type definition."
      },
      FIELD_DEFINITION: {
        value: _directiveLocation.DirectiveLocation.FIELD_DEFINITION,
        description: "Location adjacent to a field definition."
      },
      ARGUMENT_DEFINITION: {
        value: _directiveLocation.DirectiveLocation.ARGUMENT_DEFINITION,
        description: "Location adjacent to an argument definition."
      },
      INTERFACE: {
        value: _directiveLocation.DirectiveLocation.INTERFACE,
        description: "Location adjacent to an interface definition."
      },
      UNION: {
        value: _directiveLocation.DirectiveLocation.UNION,
        description: "Location adjacent to a union definition."
      },
      ENUM: {
        value: _directiveLocation.DirectiveLocation.ENUM,
        description: "Location adjacent to an enum definition."
      },
      ENUM_VALUE: {
        value: _directiveLocation.DirectiveLocation.ENUM_VALUE,
        description: "Location adjacent to an enum value definition."
      },
      INPUT_OBJECT: {
        value: _directiveLocation.DirectiveLocation.INPUT_OBJECT,
        description: "Location adjacent to an input object type definition."
      },
      INPUT_FIELD_DEFINITION: {
        value: _directiveLocation.DirectiveLocation.INPUT_FIELD_DEFINITION,
        description: "Location adjacent to an input object field definition."
      }
    }
  });
  exports.__DirectiveLocation = __DirectiveLocation;
  var __Type = new _definition.GraphQLObjectType({
    name: "__Type",
    description: "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
    fields: () => ({
      kind: {
        type: new _definition.GraphQLNonNull(__TypeKind),
        resolve(type) {
          if ((0, _definition.isScalarType)(type)) {
            return TypeKind.SCALAR;
          }
          if ((0, _definition.isObjectType)(type)) {
            return TypeKind.OBJECT;
          }
          if ((0, _definition.isInterfaceType)(type)) {
            return TypeKind.INTERFACE;
          }
          if ((0, _definition.isUnionType)(type)) {
            return TypeKind.UNION;
          }
          if ((0, _definition.isEnumType)(type)) {
            return TypeKind.ENUM;
          }
          if ((0, _definition.isInputObjectType)(type)) {
            return TypeKind.INPUT_OBJECT;
          }
          if ((0, _definition.isListType)(type)) {
            return TypeKind.LIST;
          }
          if ((0, _definition.isNonNullType)(type)) {
            return TypeKind.NON_NULL;
          }
          (0, _invariant.invariant)(false, `Unexpected type: "${(0, _inspect.inspect)(type)}".`);
        }
      },
      name: {
        type: _scalars.GraphQLString,
        resolve: (type) => ("name" in type) ? type.name : undefined
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: (type) => ("description" in type) ? type.description : undefined
      },
      specifiedByURL: {
        type: _scalars.GraphQLString,
        resolve: (obj) => ("specifiedByURL" in obj) ? obj.specifiedByURL : undefined
      },
      fields: {
        type: new _definition.GraphQLList(new _definition.GraphQLNonNull(__Field)),
        args: {
          includeDeprecated: {
            type: _scalars.GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve(type, { includeDeprecated }) {
          if ((0, _definition.isObjectType)(type) || (0, _definition.isInterfaceType)(type)) {
            const fields = Object.values(type.getFields());
            return includeDeprecated ? fields : fields.filter((field) => field.deprecationReason == null);
          }
        }
      },
      interfaces: {
        type: new _definition.GraphQLList(new _definition.GraphQLNonNull(__Type)),
        resolve(type) {
          if ((0, _definition.isObjectType)(type) || (0, _definition.isInterfaceType)(type)) {
            return type.getInterfaces();
          }
        }
      },
      possibleTypes: {
        type: new _definition.GraphQLList(new _definition.GraphQLNonNull(__Type)),
        resolve(type, _args, _context, { schema }) {
          if ((0, _definition.isAbstractType)(type)) {
            return schema.getPossibleTypes(type);
          }
        }
      },
      enumValues: {
        type: new _definition.GraphQLList(new _definition.GraphQLNonNull(__EnumValue)),
        args: {
          includeDeprecated: {
            type: _scalars.GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve(type, { includeDeprecated }) {
          if ((0, _definition.isEnumType)(type)) {
            const values = type.getValues();
            return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
          }
        }
      },
      inputFields: {
        type: new _definition.GraphQLList(new _definition.GraphQLNonNull(__InputValue)),
        args: {
          includeDeprecated: {
            type: _scalars.GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve(type, { includeDeprecated }) {
          if ((0, _definition.isInputObjectType)(type)) {
            const values = Object.values(type.getFields());
            return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
          }
        }
      },
      ofType: {
        type: __Type,
        resolve: (type) => ("ofType" in type) ? type.ofType : undefined
      },
      isOneOf: {
        type: _scalars.GraphQLBoolean,
        resolve: (type) => {
          if ((0, _definition.isInputObjectType)(type)) {
            return type.isOneOf;
          }
        }
      }
    })
  });
  exports.__Type = __Type;
  var __Field = new _definition.GraphQLObjectType({
    name: "__Field",
    description: "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
    fields: () => ({
      name: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLString),
        resolve: (field) => field.name
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: (field) => field.description
      },
      args: {
        type: new _definition.GraphQLNonNull(new _definition.GraphQLList(new _definition.GraphQLNonNull(__InputValue))),
        args: {
          includeDeprecated: {
            type: _scalars.GraphQLBoolean,
            defaultValue: false
          }
        },
        resolve(field, { includeDeprecated }) {
          return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
        }
      },
      type: {
        type: new _definition.GraphQLNonNull(__Type),
        resolve: (field) => field.type
      },
      isDeprecated: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLBoolean),
        resolve: (field) => field.deprecationReason != null
      },
      deprecationReason: {
        type: _scalars.GraphQLString,
        resolve: (field) => field.deprecationReason
      }
    })
  });
  exports.__Field = __Field;
  var __InputValue = new _definition.GraphQLObjectType({
    name: "__InputValue",
    description: "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
    fields: () => ({
      name: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLString),
        resolve: (inputValue) => inputValue.name
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: (inputValue) => inputValue.description
      },
      type: {
        type: new _definition.GraphQLNonNull(__Type),
        resolve: (inputValue) => inputValue.type
      },
      defaultValue: {
        type: _scalars.GraphQLString,
        description: "A GraphQL-formatted string representing the default value for this input value.",
        resolve(inputValue) {
          const { type, defaultValue } = inputValue;
          const valueAST = (0, _astFromValue.astFromValue)(defaultValue, type);
          return valueAST ? (0, _printer.print)(valueAST) : null;
        }
      },
      isDeprecated: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLBoolean),
        resolve: (field) => field.deprecationReason != null
      },
      deprecationReason: {
        type: _scalars.GraphQLString,
        resolve: (obj) => obj.deprecationReason
      }
    })
  });
  exports.__InputValue = __InputValue;
  var __EnumValue = new _definition.GraphQLObjectType({
    name: "__EnumValue",
    description: "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
    fields: () => ({
      name: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLString),
        resolve: (enumValue) => enumValue.name
      },
      description: {
        type: _scalars.GraphQLString,
        resolve: (enumValue) => enumValue.description
      },
      isDeprecated: {
        type: new _definition.GraphQLNonNull(_scalars.GraphQLBoolean),
        resolve: (enumValue) => enumValue.deprecationReason != null
      },
      deprecationReason: {
        type: _scalars.GraphQLString,
        resolve: (enumValue) => enumValue.deprecationReason
      }
    })
  });
  exports.__EnumValue = __EnumValue;
  var TypeKind;
  exports.TypeKind = TypeKind;
  (function(TypeKind2) {
    TypeKind2["SCALAR"] = "SCALAR";
    TypeKind2["OBJECT"] = "OBJECT";
    TypeKind2["INTERFACE"] = "INTERFACE";
    TypeKind2["UNION"] = "UNION";
    TypeKind2["ENUM"] = "ENUM";
    TypeKind2["INPUT_OBJECT"] = "INPUT_OBJECT";
    TypeKind2["LIST"] = "LIST";
    TypeKind2["NON_NULL"] = "NON_NULL";
  })(TypeKind || (exports.TypeKind = TypeKind = {}));
  var __TypeKind = new _definition.GraphQLEnumType({
    name: "__TypeKind",
    description: "An enum describing what kind of type a given `__Type` is.",
    values: {
      SCALAR: {
        value: TypeKind.SCALAR,
        description: "Indicates this type is a scalar."
      },
      OBJECT: {
        value: TypeKind.OBJECT,
        description: "Indicates this type is an object. `fields` and `interfaces` are valid fields."
      },
      INTERFACE: {
        value: TypeKind.INTERFACE,
        description: "Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields."
      },
      UNION: {
        value: TypeKind.UNION,
        description: "Indicates this type is a union. `possibleTypes` is a valid field."
      },
      ENUM: {
        value: TypeKind.ENUM,
        description: "Indicates this type is an enum. `enumValues` is a valid field."
      },
      INPUT_OBJECT: {
        value: TypeKind.INPUT_OBJECT,
        description: "Indicates this type is an input object. `inputFields` is a valid field."
      },
      LIST: {
        value: TypeKind.LIST,
        description: "Indicates this type is a list. `ofType` is a valid field."
      },
      NON_NULL: {
        value: TypeKind.NON_NULL,
        description: "Indicates this type is a non-null. `ofType` is a valid field."
      }
    }
  });
  exports.__TypeKind = __TypeKind;
  var SchemaMetaFieldDef = {
    name: "__schema",
    type: new _definition.GraphQLNonNull(__Schema),
    description: "Access the current type schema of this server.",
    args: [],
    resolve: (_source, _args, _context, { schema }) => schema,
    deprecationReason: undefined,
    extensions: Object.create(null),
    astNode: undefined
  };
  exports.SchemaMetaFieldDef = SchemaMetaFieldDef;
  var TypeMetaFieldDef = {
    name: "__type",
    type: __Type,
    description: "Request the type information of a single type.",
    args: [
      {
        name: "name",
        description: undefined,
        type: new _definition.GraphQLNonNull(_scalars.GraphQLString),
        defaultValue: undefined,
        deprecationReason: undefined,
        extensions: Object.create(null),
        astNode: undefined
      }
    ],
    resolve: (_source, { name }, _context, { schema }) => schema.getType(name),
    deprecationReason: undefined,
    extensions: Object.create(null),
    astNode: undefined
  };
  exports.TypeMetaFieldDef = TypeMetaFieldDef;
  var TypeNameMetaFieldDef = {
    name: "__typename",
    type: new _definition.GraphQLNonNull(_scalars.GraphQLString),
    description: "The name of the current Object type at runtime.",
    args: [],
    resolve: (_source, _args, _context, { parentType }) => parentType.name,
    deprecationReason: undefined,
    extensions: Object.create(null),
    astNode: undefined
  };
  exports.TypeNameMetaFieldDef = TypeNameMetaFieldDef;
  var introspectionTypes = Object.freeze([
    __Schema,
    __Directive,
    __DirectiveLocation,
    __Type,
    __Field,
    __InputValue,
    __EnumValue,
    __TypeKind
  ]);
  exports.introspectionTypes = introspectionTypes;
  function isIntrospectionType(type) {
    return introspectionTypes.some(({ name }) => type.name === name);
  }
});

// node_modules/graphql/type/schema.js
var require_schema = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GraphQLSchema = undefined;
  exports.assertSchema = assertSchema;
  exports.isSchema = isSchema;
  var _devAssert = require_devAssert();
  var _inspect = require_inspect();
  var _instanceOf = require_instanceOf();
  var _isObjectLike = require_isObjectLike();
  var _toObjMap = require_toObjMap();
  var _ast = require_ast();
  var _definition = require_definition();
  var _directives = require_directives();
  var _introspection = require_introspection();
  function isSchema(schema) {
    return (0, _instanceOf.instanceOf)(schema, GraphQLSchema);
  }
  function assertSchema(schema) {
    if (!isSchema(schema)) {
      throw new Error(`Expected ${(0, _inspect.inspect)(schema)} to be a GraphQL schema.`);
    }
    return schema;
  }

  class GraphQLSchema {
    constructor(config) {
      var _config$extensionASTN, _config$directives;
      this.__validationErrors = config.assumeValid === true ? [] : undefined;
      (0, _isObjectLike.isObjectLike)(config) || (0, _devAssert.devAssert)(false, "Must provide configuration object.");
      !config.types || Array.isArray(config.types) || (0, _devAssert.devAssert)(false, `"types" must be Array if provided but got: ${(0, _inspect.inspect)(config.types)}.`);
      !config.directives || Array.isArray(config.directives) || (0, _devAssert.devAssert)(false, '"directives" must be Array if provided but got: ' + `${(0, _inspect.inspect)(config.directives)}.`);
      this.description = config.description;
      this.extensions = (0, _toObjMap.toObjMap)(config.extensions);
      this.astNode = config.astNode;
      this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== undefined ? _config$extensionASTN : [];
      this._queryType = config.query;
      this._mutationType = config.mutation;
      this._subscriptionType = config.subscription;
      this._directives = (_config$directives = config.directives) !== null && _config$directives !== undefined ? _config$directives : _directives.specifiedDirectives;
      const allReferencedTypes = new Set(config.types);
      if (config.types != null) {
        for (const type of config.types) {
          allReferencedTypes.delete(type);
          collectReferencedTypes(type, allReferencedTypes);
        }
      }
      if (this._queryType != null) {
        collectReferencedTypes(this._queryType, allReferencedTypes);
      }
      if (this._mutationType != null) {
        collectReferencedTypes(this._mutationType, allReferencedTypes);
      }
      if (this._subscriptionType != null) {
        collectReferencedTypes(this._subscriptionType, allReferencedTypes);
      }
      for (const directive of this._directives) {
        if ((0, _directives.isDirective)(directive)) {
          for (const arg of directive.args) {
            collectReferencedTypes(arg.type, allReferencedTypes);
          }
        }
      }
      collectReferencedTypes(_introspection.__Schema, allReferencedTypes);
      this._typeMap = Object.create(null);
      this._subTypeMap = Object.create(null);
      this._implementationsMap = Object.create(null);
      for (const namedType of allReferencedTypes) {
        if (namedType == null) {
          continue;
        }
        const typeName = namedType.name;
        typeName || (0, _devAssert.devAssert)(false, "One of the provided types for building the Schema is missing a name.");
        if (this._typeMap[typeName] !== undefined) {
          throw new Error(`Schema must contain uniquely named types but contains multiple types named "${typeName}".`);
        }
        this._typeMap[typeName] = namedType;
        if ((0, _definition.isInterfaceType)(namedType)) {
          for (const iface of namedType.getInterfaces()) {
            if ((0, _definition.isInterfaceType)(iface)) {
              let implementations = this._implementationsMap[iface.name];
              if (implementations === undefined) {
                implementations = this._implementationsMap[iface.name] = {
                  objects: [],
                  interfaces: []
                };
              }
              implementations.interfaces.push(namedType);
            }
          }
        } else if ((0, _definition.isObjectType)(namedType)) {
          for (const iface of namedType.getInterfaces()) {
            if ((0, _definition.isInterfaceType)(iface)) {
              let implementations = this._implementationsMap[iface.name];
              if (implementations === undefined) {
                implementations = this._implementationsMap[iface.name] = {
                  objects: [],
                  interfaces: []
                };
              }
              implementations.objects.push(namedType);
            }
          }
        }
      }
    }
    get [Symbol.toStringTag]() {
      return "GraphQLSchema";
    }
    getQueryType() {
      return this._queryType;
    }
    getMutationType() {
      return this._mutationType;
    }
    getSubscriptionType() {
      return this._subscriptionType;
    }
    getRootType(operation) {
      switch (operation) {
        case _ast.OperationTypeNode.QUERY:
          return this.getQueryType();
        case _ast.OperationTypeNode.MUTATION:
          return this.getMutationType();
        case _ast.OperationTypeNode.SUBSCRIPTION:
          return this.getSubscriptionType();
      }
    }
    getTypeMap() {
      return this._typeMap;
    }
    getType(name) {
      return this.getTypeMap()[name];
    }
    getPossibleTypes(abstractType) {
      return (0, _definition.isUnionType)(abstractType) ? abstractType.getTypes() : this.getImplementations(abstractType).objects;
    }
    getImplementations(interfaceType) {
      const implementations = this._implementationsMap[interfaceType.name];
      return implementations !== null && implementations !== undefined ? implementations : {
        objects: [],
        interfaces: []
      };
    }
    isSubType(abstractType, maybeSubType) {
      let map2 = this._subTypeMap[abstractType.name];
      if (map2 === undefined) {
        map2 = Object.create(null);
        if ((0, _definition.isUnionType)(abstractType)) {
          for (const type of abstractType.getTypes()) {
            map2[type.name] = true;
          }
        } else {
          const implementations = this.getImplementations(abstractType);
          for (const type of implementations.objects) {
            map2[type.name] = true;
          }
          for (const type of implementations.interfaces) {
            map2[type.name] = true;
          }
        }
        this._subTypeMap[abstractType.name] = map2;
      }
      return map2[maybeSubType.name] !== undefined;
    }
    getDirectives() {
      return this._directives;
    }
    getDirective(name) {
      return this.getDirectives().find((directive) => directive.name === name);
    }
    toConfig() {
      return {
        description: this.description,
        query: this.getQueryType(),
        mutation: this.getMutationType(),
        subscription: this.getSubscriptionType(),
        types: Object.values(this.getTypeMap()),
        directives: this.getDirectives(),
        extensions: this.extensions,
        astNode: this.astNode,
        extensionASTNodes: this.extensionASTNodes,
        assumeValid: this.__validationErrors !== undefined
      };
    }
  }
  exports.GraphQLSchema = GraphQLSchema;
  function collectReferencedTypes(type, typeSet) {
    const namedType = (0, _definition.getNamedType)(type);
    if (!typeSet.has(namedType)) {
      typeSet.add(namedType);
      if ((0, _definition.isUnionType)(namedType)) {
        for (const memberType of namedType.getTypes()) {
          collectReferencedTypes(memberType, typeSet);
        }
      } else if ((0, _definition.isObjectType)(namedType) || (0, _definition.isInterfaceType)(namedType)) {
        for (const interfaceType of namedType.getInterfaces()) {
          collectReferencedTypes(interfaceType, typeSet);
        }
        for (const field of Object.values(namedType.getFields())) {
          collectReferencedTypes(field.type, typeSet);
          for (const arg of field.args) {
            collectReferencedTypes(arg.type, typeSet);
          }
        }
      } else if ((0, _definition.isInputObjectType)(namedType)) {
        for (const field of Object.values(namedType.getFields())) {
          collectReferencedTypes(field.type, typeSet);
        }
      }
    }
    return typeSet;
  }
});

// node_modules/graphql/type/validate.js
var require_validate = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.assertValidSchema = assertValidSchema;
  exports.validateSchema = validateSchema;
  var _inspect = require_inspect();
  var _GraphQLError = require_GraphQLError();
  var _ast = require_ast();
  var _typeComparators = require_typeComparators();
  var _definition = require_definition();
  var _directives = require_directives();
  var _introspection = require_introspection();
  var _schema = require_schema();
  function validateSchema(schema) {
    (0, _schema.assertSchema)(schema);
    if (schema.__validationErrors) {
      return schema.__validationErrors;
    }
    const context = new SchemaValidationContext(schema);
    validateRootTypes(context);
    validateDirectives(context);
    validateTypes(context);
    const errors2 = context.getErrors();
    schema.__validationErrors = errors2;
    return errors2;
  }
  function assertValidSchema(schema) {
    const errors2 = validateSchema(schema);
    if (errors2.length !== 0) {
      throw new Error(errors2.map((error) => error.message).join(`

`));
    }
  }

  class SchemaValidationContext {
    constructor(schema) {
      this._errors = [];
      this.schema = schema;
    }
    reportError(message, nodes) {
      const _nodes = Array.isArray(nodes) ? nodes.filter(Boolean) : nodes;
      this._errors.push(new _GraphQLError.GraphQLError(message, {
        nodes: _nodes
      }));
    }
    getErrors() {
      return this._errors;
    }
  }
  function validateRootTypes(context) {
    const schema = context.schema;
    const queryType = schema.getQueryType();
    if (!queryType) {
      context.reportError("Query root type must be provided.", schema.astNode);
    } else if (!(0, _definition.isObjectType)(queryType)) {
      var _getOperationTypeNode;
      context.reportError(`Query root type must be Object type, it cannot be ${(0, _inspect.inspect)(queryType)}.`, (_getOperationTypeNode = getOperationTypeNode(schema, _ast.OperationTypeNode.QUERY)) !== null && _getOperationTypeNode !== undefined ? _getOperationTypeNode : queryType.astNode);
    }
    const mutationType = schema.getMutationType();
    if (mutationType && !(0, _definition.isObjectType)(mutationType)) {
      var _getOperationTypeNode2;
      context.reportError("Mutation root type must be Object type if provided, it cannot be " + `${(0, _inspect.inspect)(mutationType)}.`, (_getOperationTypeNode2 = getOperationTypeNode(schema, _ast.OperationTypeNode.MUTATION)) !== null && _getOperationTypeNode2 !== undefined ? _getOperationTypeNode2 : mutationType.astNode);
    }
    const subscriptionType = schema.getSubscriptionType();
    if (subscriptionType && !(0, _definition.isObjectType)(subscriptionType)) {
      var _getOperationTypeNode3;
      context.reportError("Subscription root type must be Object type if provided, it cannot be " + `${(0, _inspect.inspect)(subscriptionType)}.`, (_getOperationTypeNode3 = getOperationTypeNode(schema, _ast.OperationTypeNode.SUBSCRIPTION)) !== null && _getOperationTypeNode3 !== undefined ? _getOperationTypeNode3 : subscriptionType.astNode);
    }
  }
  function getOperationTypeNode(schema, operation) {
    var _flatMap$find;
    return (_flatMap$find = [schema.astNode, ...schema.extensionASTNodes].flatMap((schemaNode) => {
      var _schemaNode$operation;
      return (_schemaNode$operation = schemaNode === null || schemaNode === undefined ? undefined : schemaNode.operationTypes) !== null && _schemaNode$operation !== undefined ? _schemaNode$operation : [];
    }).find((operationNode) => operationNode.operation === operation)) === null || _flatMap$find === undefined ? undefined : _flatMap$find.type;
  }
  function validateDirectives(context) {
    for (const directive of context.schema.getDirectives()) {
      if (!(0, _directives.isDirective)(directive)) {
        context.reportError(`Expected directive but got: ${(0, _inspect.inspect)(directive)}.`, directive === null || directive === undefined ? undefined : directive.astNode);
        continue;
      }
      validateName(context, directive);
      if (directive.locations.length === 0) {
        context.reportError(`Directive @${directive.name} must include 1 or more locations.`, directive.astNode);
      }
      for (const arg of directive.args) {
        validateName(context, arg);
        if (!(0, _definition.isInputType)(arg.type)) {
          context.reportError(`The type of @${directive.name}(${arg.name}:) must be Input Type ` + `but got: ${(0, _inspect.inspect)(arg.type)}.`, arg.astNode);
        }
        if ((0, _definition.isRequiredArgument)(arg) && arg.deprecationReason != null) {
          var _arg$astNode;
          context.reportError(`Required argument @${directive.name}(${arg.name}:) cannot be deprecated.`, [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode = arg.astNode) === null || _arg$astNode === undefined ? undefined : _arg$astNode.type
          ]);
        }
      }
    }
  }
  function validateName(context, node) {
    if (node.name.startsWith("__")) {
      context.reportError(`Name "${node.name}" must not begin with "__", which is reserved by GraphQL introspection.`, node.astNode);
    }
  }
  function validateTypes(context) {
    const validateInputObjectCircularRefs = createInputObjectCircularRefsValidator(context);
    const typeMap = context.schema.getTypeMap();
    for (const type of Object.values(typeMap)) {
      if (!(0, _definition.isNamedType)(type)) {
        context.reportError(`Expected GraphQL named type but got: ${(0, _inspect.inspect)(type)}.`, type.astNode);
        continue;
      }
      if (!(0, _introspection.isIntrospectionType)(type)) {
        validateName(context, type);
      }
      if ((0, _definition.isObjectType)(type)) {
        validateFields(context, type);
        validateInterfaces(context, type);
      } else if ((0, _definition.isInterfaceType)(type)) {
        validateFields(context, type);
        validateInterfaces(context, type);
      } else if ((0, _definition.isUnionType)(type)) {
        validateUnionMembers(context, type);
      } else if ((0, _definition.isEnumType)(type)) {
        validateEnumValues(context, type);
      } else if ((0, _definition.isInputObjectType)(type)) {
        validateInputFields(context, type);
        validateInputObjectCircularRefs(type);
      }
    }
  }
  function validateFields(context, type) {
    const fields = Object.values(type.getFields());
    if (fields.length === 0) {
      context.reportError(`Type ${type.name} must define one or more fields.`, [
        type.astNode,
        ...type.extensionASTNodes
      ]);
    }
    for (const field of fields) {
      validateName(context, field);
      if (!(0, _definition.isOutputType)(field.type)) {
        var _field$astNode;
        context.reportError(`The type of ${type.name}.${field.name} must be Output Type ` + `but got: ${(0, _inspect.inspect)(field.type)}.`, (_field$astNode = field.astNode) === null || _field$astNode === undefined ? undefined : _field$astNode.type);
      }
      for (const arg of field.args) {
        const argName = arg.name;
        validateName(context, arg);
        if (!(0, _definition.isInputType)(arg.type)) {
          var _arg$astNode2;
          context.reportError(`The type of ${type.name}.${field.name}(${argName}:) must be Input ` + `Type but got: ${(0, _inspect.inspect)(arg.type)}.`, (_arg$astNode2 = arg.astNode) === null || _arg$astNode2 === undefined ? undefined : _arg$astNode2.type);
        }
        if ((0, _definition.isRequiredArgument)(arg) && arg.deprecationReason != null) {
          var _arg$astNode3;
          context.reportError(`Required argument ${type.name}.${field.name}(${argName}:) cannot be deprecated.`, [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode3 = arg.astNode) === null || _arg$astNode3 === undefined ? undefined : _arg$astNode3.type
          ]);
        }
      }
    }
  }
  function validateInterfaces(context, type) {
    const ifaceTypeNames = Object.create(null);
    for (const iface of type.getInterfaces()) {
      if (!(0, _definition.isInterfaceType)(iface)) {
        context.reportError(`Type ${(0, _inspect.inspect)(type)} must only implement Interface types, ` + `it cannot implement ${(0, _inspect.inspect)(iface)}.`, getAllImplementsInterfaceNodes(type, iface));
        continue;
      }
      if (type === iface) {
        context.reportError(`Type ${type.name} cannot implement itself because it would create a circular reference.`, getAllImplementsInterfaceNodes(type, iface));
        continue;
      }
      if (ifaceTypeNames[iface.name]) {
        context.reportError(`Type ${type.name} can only implement ${iface.name} once.`, getAllImplementsInterfaceNodes(type, iface));
        continue;
      }
      ifaceTypeNames[iface.name] = true;
      validateTypeImplementsAncestors(context, type, iface);
      validateTypeImplementsInterface(context, type, iface);
    }
  }
  function validateTypeImplementsInterface(context, type, iface) {
    const typeFieldMap = type.getFields();
    for (const ifaceField of Object.values(iface.getFields())) {
      const fieldName = ifaceField.name;
      const typeField = typeFieldMap[fieldName];
      if (!typeField) {
        context.reportError(`Interface field ${iface.name}.${fieldName} expected but ${type.name} does not provide it.`, [ifaceField.astNode, type.astNode, ...type.extensionASTNodes]);
        continue;
      }
      if (!(0, _typeComparators.isTypeSubTypeOf)(context.schema, typeField.type, ifaceField.type)) {
        var _ifaceField$astNode, _typeField$astNode;
        context.reportError(`Interface field ${iface.name}.${fieldName} expects type ` + `${(0, _inspect.inspect)(ifaceField.type)} but ${type.name}.${fieldName} ` + `is type ${(0, _inspect.inspect)(typeField.type)}.`, [
          (_ifaceField$astNode = ifaceField.astNode) === null || _ifaceField$astNode === undefined ? undefined : _ifaceField$astNode.type,
          (_typeField$astNode = typeField.astNode) === null || _typeField$astNode === undefined ? undefined : _typeField$astNode.type
        ]);
      }
      for (const ifaceArg of ifaceField.args) {
        const argName = ifaceArg.name;
        const typeArg = typeField.args.find((arg) => arg.name === argName);
        if (!typeArg) {
          context.reportError(`Interface field argument ${iface.name}.${fieldName}(${argName}:) expected but ${type.name}.${fieldName} does not provide it.`, [ifaceArg.astNode, typeField.astNode]);
          continue;
        }
        if (!(0, _typeComparators.isEqualType)(ifaceArg.type, typeArg.type)) {
          var _ifaceArg$astNode, _typeArg$astNode;
          context.reportError(`Interface field argument ${iface.name}.${fieldName}(${argName}:) ` + `expects type ${(0, _inspect.inspect)(ifaceArg.type)} but ` + `${type.name}.${fieldName}(${argName}:) is type ` + `${(0, _inspect.inspect)(typeArg.type)}.`, [
            (_ifaceArg$astNode = ifaceArg.astNode) === null || _ifaceArg$astNode === undefined ? undefined : _ifaceArg$astNode.type,
            (_typeArg$astNode = typeArg.astNode) === null || _typeArg$astNode === undefined ? undefined : _typeArg$astNode.type
          ]);
        }
      }
      for (const typeArg of typeField.args) {
        const argName = typeArg.name;
        const ifaceArg = ifaceField.args.find((arg) => arg.name === argName);
        if (!ifaceArg && (0, _definition.isRequiredArgument)(typeArg)) {
          context.reportError(`Object field ${type.name}.${fieldName} includes required argument ${argName} that is missing from the Interface field ${iface.name}.${fieldName}.`, [typeArg.astNode, ifaceField.astNode]);
        }
      }
    }
  }
  function validateTypeImplementsAncestors(context, type, iface) {
    const ifaceInterfaces = type.getInterfaces();
    for (const transitive of iface.getInterfaces()) {
      if (!ifaceInterfaces.includes(transitive)) {
        context.reportError(transitive === type ? `Type ${type.name} cannot implement ${iface.name} because it would create a circular reference.` : `Type ${type.name} must implement ${transitive.name} because it is implemented by ${iface.name}.`, [
          ...getAllImplementsInterfaceNodes(iface, transitive),
          ...getAllImplementsInterfaceNodes(type, iface)
        ]);
      }
    }
  }
  function validateUnionMembers(context, union2) {
    const memberTypes = union2.getTypes();
    if (memberTypes.length === 0) {
      context.reportError(`Union type ${union2.name} must define one or more member types.`, [union2.astNode, ...union2.extensionASTNodes]);
    }
    const includedTypeNames = Object.create(null);
    for (const memberType of memberTypes) {
      if (includedTypeNames[memberType.name]) {
        context.reportError(`Union type ${union2.name} can only include type ${memberType.name} once.`, getUnionMemberTypeNodes(union2, memberType.name));
        continue;
      }
      includedTypeNames[memberType.name] = true;
      if (!(0, _definition.isObjectType)(memberType)) {
        context.reportError(`Union type ${union2.name} can only include Object types, ` + `it cannot include ${(0, _inspect.inspect)(memberType)}.`, getUnionMemberTypeNodes(union2, String(memberType)));
      }
    }
  }
  function validateEnumValues(context, enumType2) {
    const enumValues = enumType2.getValues();
    if (enumValues.length === 0) {
      context.reportError(`Enum type ${enumType2.name} must define one or more values.`, [enumType2.astNode, ...enumType2.extensionASTNodes]);
    }
    for (const enumValue of enumValues) {
      validateName(context, enumValue);
    }
  }
  function validateInputFields(context, inputObj) {
    const fields = Object.values(inputObj.getFields());
    if (fields.length === 0) {
      context.reportError(`Input Object type ${inputObj.name} must define one or more fields.`, [inputObj.astNode, ...inputObj.extensionASTNodes]);
    }
    for (const field of fields) {
      validateName(context, field);
      if (!(0, _definition.isInputType)(field.type)) {
        var _field$astNode2;
        context.reportError(`The type of ${inputObj.name}.${field.name} must be Input Type ` + `but got: ${(0, _inspect.inspect)(field.type)}.`, (_field$astNode2 = field.astNode) === null || _field$astNode2 === undefined ? undefined : _field$astNode2.type);
      }
      if ((0, _definition.isRequiredInputField)(field) && field.deprecationReason != null) {
        var _field$astNode3;
        context.reportError(`Required input field ${inputObj.name}.${field.name} cannot be deprecated.`, [
          getDeprecatedDirectiveNode(field.astNode),
          (_field$astNode3 = field.astNode) === null || _field$astNode3 === undefined ? undefined : _field$astNode3.type
        ]);
      }
      if (inputObj.isOneOf) {
        validateOneOfInputObjectField(inputObj, field, context);
      }
    }
  }
  function validateOneOfInputObjectField(type, field, context) {
    if ((0, _definition.isNonNullType)(field.type)) {
      var _field$astNode4;
      context.reportError(`OneOf input field ${type.name}.${field.name} must be nullable.`, (_field$astNode4 = field.astNode) === null || _field$astNode4 === undefined ? undefined : _field$astNode4.type);
    }
    if (field.defaultValue !== undefined) {
      context.reportError(`OneOf input field ${type.name}.${field.name} cannot have a default value.`, field.astNode);
    }
  }
  function createInputObjectCircularRefsValidator(context) {
    const visitedTypes = Object.create(null);
    const fieldPath = [];
    const fieldPathIndexByTypeName = Object.create(null);
    return detectCycleRecursive;
    function detectCycleRecursive(inputObj) {
      if (visitedTypes[inputObj.name]) {
        return;
      }
      visitedTypes[inputObj.name] = true;
      fieldPathIndexByTypeName[inputObj.name] = fieldPath.length;
      const fields = Object.values(inputObj.getFields());
      for (const field of fields) {
        if ((0, _definition.isNonNullType)(field.type) && (0, _definition.isInputObjectType)(field.type.ofType)) {
          const fieldType = field.type.ofType;
          const cycleIndex = fieldPathIndexByTypeName[fieldType.name];
          fieldPath.push(field);
          if (cycleIndex === undefined) {
            detectCycleRecursive(fieldType);
          } else {
            const cyclePath = fieldPath.slice(cycleIndex);
            const pathStr = cyclePath.map((fieldObj) => fieldObj.name).join(".");
            context.reportError(`Cannot reference Input Object "${fieldType.name}" within itself through a series of non-null fields: "${pathStr}".`, cyclePath.map((fieldObj) => fieldObj.astNode));
          }
          fieldPath.pop();
        }
      }
      fieldPathIndexByTypeName[inputObj.name] = undefined;
    }
  }
  function getAllImplementsInterfaceNodes(type, iface) {
    const { astNode, extensionASTNodes } = type;
    const nodes = astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes;
    return nodes.flatMap((typeNode) => {
      var _typeNode$interfaces;
      return (_typeNode$interfaces = typeNode.interfaces) !== null && _typeNode$interfaces !== undefined ? _typeNode$interfaces : [];
    }).filter((ifaceNode) => ifaceNode.name.value === iface.name);
  }
  function getUnionMemberTypeNodes(union2, typeName) {
    const { astNode, extensionASTNodes } = union2;
    const nodes = astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes;
    return nodes.flatMap((unionNode) => {
      var _unionNode$types;
      return (_unionNode$types = unionNode.types) !== null && _unionNode$types !== undefined ? _unionNode$types : [];
    }).filter((typeNode) => typeNode.name.value === typeName);
  }
  function getDeprecatedDirectiveNode(definitionNode) {
    var _definitionNode$direc;
    return definitionNode === null || definitionNode === undefined ? undefined : (_definitionNode$direc = definitionNode.directives) === null || _definitionNode$direc === undefined ? undefined : _definitionNode$direc.find((node) => node.name.value === _directives.GraphQLDeprecatedDirective.name);
  }
});

// node_modules/graphql/utilities/typeFromAST.js
var require_typeFromAST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.typeFromAST = typeFromAST;
  var _kinds = require_kinds();
  var _definition = require_definition();
  function typeFromAST(schema, typeNode) {
    switch (typeNode.kind) {
      case _kinds.Kind.LIST_TYPE: {
        const innerType = typeFromAST(schema, typeNode.type);
        return innerType && new _definition.GraphQLList(innerType);
      }
      case _kinds.Kind.NON_NULL_TYPE: {
        const innerType = typeFromAST(schema, typeNode.type);
        return innerType && new _definition.GraphQLNonNull(innerType);
      }
      case _kinds.Kind.NAMED_TYPE:
        return schema.getType(typeNode.name.value);
    }
  }
});

// node_modules/graphql/utilities/TypeInfo.js
var require_TypeInfo = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TypeInfo = undefined;
  exports.visitWithTypeInfo = visitWithTypeInfo;
  var _ast = require_ast();
  var _kinds = require_kinds();
  var _visitor = require_visitor();
  var _definition = require_definition();
  var _introspection = require_introspection();
  var _typeFromAST = require_typeFromAST();

  class TypeInfo {
    constructor(schema, initialType, getFieldDefFn) {
      this._schema = schema;
      this._typeStack = [];
      this._parentTypeStack = [];
      this._inputTypeStack = [];
      this._fieldDefStack = [];
      this._defaultValueStack = [];
      this._directive = null;
      this._argument = null;
      this._enumValue = null;
      this._getFieldDef = getFieldDefFn !== null && getFieldDefFn !== undefined ? getFieldDefFn : getFieldDef;
      if (initialType) {
        if ((0, _definition.isInputType)(initialType)) {
          this._inputTypeStack.push(initialType);
        }
        if ((0, _definition.isCompositeType)(initialType)) {
          this._parentTypeStack.push(initialType);
        }
        if ((0, _definition.isOutputType)(initialType)) {
          this._typeStack.push(initialType);
        }
      }
    }
    get [Symbol.toStringTag]() {
      return "TypeInfo";
    }
    getType() {
      if (this._typeStack.length > 0) {
        return this._typeStack[this._typeStack.length - 1];
      }
    }
    getParentType() {
      if (this._parentTypeStack.length > 0) {
        return this._parentTypeStack[this._parentTypeStack.length - 1];
      }
    }
    getInputType() {
      if (this._inputTypeStack.length > 0) {
        return this._inputTypeStack[this._inputTypeStack.length - 1];
      }
    }
    getParentInputType() {
      if (this._inputTypeStack.length > 1) {
        return this._inputTypeStack[this._inputTypeStack.length - 2];
      }
    }
    getFieldDef() {
      if (this._fieldDefStack.length > 0) {
        return this._fieldDefStack[this._fieldDefStack.length - 1];
      }
    }
    getDefaultValue() {
      if (this._defaultValueStack.length > 0) {
        return this._defaultValueStack[this._defaultValueStack.length - 1];
      }
    }
    getDirective() {
      return this._directive;
    }
    getArgument() {
      return this._argument;
    }
    getEnumValue() {
      return this._enumValue;
    }
    enter(node) {
      const schema = this._schema;
      switch (node.kind) {
        case _kinds.Kind.SELECTION_SET: {
          const namedType = (0, _definition.getNamedType)(this.getType());
          this._parentTypeStack.push((0, _definition.isCompositeType)(namedType) ? namedType : undefined);
          break;
        }
        case _kinds.Kind.FIELD: {
          const parentType = this.getParentType();
          let fieldDef;
          let fieldType;
          if (parentType) {
            fieldDef = this._getFieldDef(schema, parentType, node);
            if (fieldDef) {
              fieldType = fieldDef.type;
            }
          }
          this._fieldDefStack.push(fieldDef);
          this._typeStack.push((0, _definition.isOutputType)(fieldType) ? fieldType : undefined);
          break;
        }
        case _kinds.Kind.DIRECTIVE:
          this._directive = schema.getDirective(node.name.value);
          break;
        case _kinds.Kind.OPERATION_DEFINITION: {
          const rootType = schema.getRootType(node.operation);
          this._typeStack.push((0, _definition.isObjectType)(rootType) ? rootType : undefined);
          break;
        }
        case _kinds.Kind.INLINE_FRAGMENT:
        case _kinds.Kind.FRAGMENT_DEFINITION: {
          const typeConditionAST = node.typeCondition;
          const outputType = typeConditionAST ? (0, _typeFromAST.typeFromAST)(schema, typeConditionAST) : (0, _definition.getNamedType)(this.getType());
          this._typeStack.push((0, _definition.isOutputType)(outputType) ? outputType : undefined);
          break;
        }
        case _kinds.Kind.VARIABLE_DEFINITION: {
          const inputType = (0, _typeFromAST.typeFromAST)(schema, node.type);
          this._inputTypeStack.push((0, _definition.isInputType)(inputType) ? inputType : undefined);
          break;
        }
        case _kinds.Kind.ARGUMENT: {
          var _this$getDirective;
          let argDef;
          let argType;
          const fieldOrDirective = (_this$getDirective = this.getDirective()) !== null && _this$getDirective !== undefined ? _this$getDirective : this.getFieldDef();
          if (fieldOrDirective) {
            argDef = fieldOrDirective.args.find((arg) => arg.name === node.name.value);
            if (argDef) {
              argType = argDef.type;
            }
          }
          this._argument = argDef;
          this._defaultValueStack.push(argDef ? argDef.defaultValue : undefined);
          this._inputTypeStack.push((0, _definition.isInputType)(argType) ? argType : undefined);
          break;
        }
        case _kinds.Kind.LIST: {
          const listType = (0, _definition.getNullableType)(this.getInputType());
          const itemType = (0, _definition.isListType)(listType) ? listType.ofType : listType;
          this._defaultValueStack.push(undefined);
          this._inputTypeStack.push((0, _definition.isInputType)(itemType) ? itemType : undefined);
          break;
        }
        case _kinds.Kind.OBJECT_FIELD: {
          const objectType2 = (0, _definition.getNamedType)(this.getInputType());
          let inputFieldType;
          let inputField;
          if ((0, _definition.isInputObjectType)(objectType2)) {
            inputField = objectType2.getFields()[node.name.value];
            if (inputField) {
              inputFieldType = inputField.type;
            }
          }
          this._defaultValueStack.push(inputField ? inputField.defaultValue : undefined);
          this._inputTypeStack.push((0, _definition.isInputType)(inputFieldType) ? inputFieldType : undefined);
          break;
        }
        case _kinds.Kind.ENUM: {
          const enumType2 = (0, _definition.getNamedType)(this.getInputType());
          let enumValue;
          if ((0, _definition.isEnumType)(enumType2)) {
            enumValue = enumType2.getValue(node.value);
          }
          this._enumValue = enumValue;
          break;
        }
        default:
      }
    }
    leave(node) {
      switch (node.kind) {
        case _kinds.Kind.SELECTION_SET:
          this._parentTypeStack.pop();
          break;
        case _kinds.Kind.FIELD:
          this._fieldDefStack.pop();
          this._typeStack.pop();
          break;
        case _kinds.Kind.DIRECTIVE:
          this._directive = null;
          break;
        case _kinds.Kind.OPERATION_DEFINITION:
        case _kinds.Kind.INLINE_FRAGMENT:
        case _kinds.Kind.FRAGMENT_DEFINITION:
          this._typeStack.pop();
          break;
        case _kinds.Kind.VARIABLE_DEFINITION:
          this._inputTypeStack.pop();
          break;
        case _kinds.Kind.ARGUMENT:
          this._argument = null;
          this._defaultValueStack.pop();
          this._inputTypeStack.pop();
          break;
        case _kinds.Kind.LIST:
        case _kinds.Kind.OBJECT_FIELD:
          this._defaultValueStack.pop();
          this._inputTypeStack.pop();
          break;
        case _kinds.Kind.ENUM:
          this._enumValue = null;
          break;
        default:
      }
    }
  }
  exports.TypeInfo = TypeInfo;
  function getFieldDef(schema, parentType, fieldNode) {
    const name = fieldNode.name.value;
    if (name === _introspection.SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
      return _introspection.SchemaMetaFieldDef;
    }
    if (name === _introspection.TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
      return _introspection.TypeMetaFieldDef;
    }
    if (name === _introspection.TypeNameMetaFieldDef.name && (0, _definition.isCompositeType)(parentType)) {
      return _introspection.TypeNameMetaFieldDef;
    }
    if ((0, _definition.isObjectType)(parentType) || (0, _definition.isInterfaceType)(parentType)) {
      return parentType.getFields()[name];
    }
  }
  function visitWithTypeInfo(typeInfo, visitor) {
    return {
      enter(...args) {
        const node = args[0];
        typeInfo.enter(node);
        const fn = (0, _visitor.getEnterLeaveForKind)(visitor, node.kind).enter;
        if (fn) {
          const result = fn.apply(visitor, args);
          if (result !== undefined) {
            typeInfo.leave(node);
            if ((0, _ast.isNode)(result)) {
              typeInfo.enter(result);
            }
          }
          return result;
        }
      },
      leave(...args) {
        const node = args[0];
        const fn = (0, _visitor.getEnterLeaveForKind)(visitor, node.kind).leave;
        let result;
        if (fn) {
          result = fn.apply(visitor, args);
        }
        typeInfo.leave(node);
        return result;
      }
    };
  }
});

// node_modules/graphql/language/predicates.js
var require_predicates = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isConstValueNode = isConstValueNode;
  exports.isDefinitionNode = isDefinitionNode;
  exports.isExecutableDefinitionNode = isExecutableDefinitionNode;
  exports.isSelectionNode = isSelectionNode;
  exports.isTypeDefinitionNode = isTypeDefinitionNode;
  exports.isTypeExtensionNode = isTypeExtensionNode;
  exports.isTypeNode = isTypeNode;
  exports.isTypeSystemDefinitionNode = isTypeSystemDefinitionNode;
  exports.isTypeSystemExtensionNode = isTypeSystemExtensionNode;
  exports.isValueNode = isValueNode;
  var _kinds = require_kinds();
  function isDefinitionNode(node) {
    return isExecutableDefinitionNode(node) || isTypeSystemDefinitionNode(node) || isTypeSystemExtensionNode(node);
  }
  function isExecutableDefinitionNode(node) {
    return node.kind === _kinds.Kind.OPERATION_DEFINITION || node.kind === _kinds.Kind.FRAGMENT_DEFINITION;
  }
  function isSelectionNode(node) {
    return node.kind === _kinds.Kind.FIELD || node.kind === _kinds.Kind.FRAGMENT_SPREAD || node.kind === _kinds.Kind.INLINE_FRAGMENT;
  }
  function isValueNode(node) {
    return node.kind === _kinds.Kind.VARIABLE || node.kind === _kinds.Kind.INT || node.kind === _kinds.Kind.FLOAT || node.kind === _kinds.Kind.STRING || node.kind === _kinds.Kind.BOOLEAN || node.kind === _kinds.Kind.NULL || node.kind === _kinds.Kind.ENUM || node.kind === _kinds.Kind.LIST || node.kind === _kinds.Kind.OBJECT;
  }
  function isConstValueNode(node) {
    return isValueNode(node) && (node.kind === _kinds.Kind.LIST ? node.values.some(isConstValueNode) : node.kind === _kinds.Kind.OBJECT ? node.fields.some((field) => isConstValueNode(field.value)) : node.kind !== _kinds.Kind.VARIABLE);
  }
  function isTypeNode(node) {
    return node.kind === _kinds.Kind.NAMED_TYPE || node.kind === _kinds.Kind.LIST_TYPE || node.kind === _kinds.Kind.NON_NULL_TYPE;
  }
  function isTypeSystemDefinitionNode(node) {
    return node.kind === _kinds.Kind.SCHEMA_DEFINITION || isTypeDefinitionNode(node) || node.kind === _kinds.Kind.DIRECTIVE_DEFINITION;
  }
  function isTypeDefinitionNode(node) {
    return node.kind === _kinds.Kind.SCALAR_TYPE_DEFINITION || node.kind === _kinds.Kind.OBJECT_TYPE_DEFINITION || node.kind === _kinds.Kind.INTERFACE_TYPE_DEFINITION || node.kind === _kinds.Kind.UNION_TYPE_DEFINITION || node.kind === _kinds.Kind.ENUM_TYPE_DEFINITION || node.kind === _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION;
  }
  function isTypeSystemExtensionNode(node) {
    return node.kind === _kinds.Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
  }
  function isTypeExtensionNode(node) {
    return node.kind === _kinds.Kind.SCALAR_TYPE_EXTENSION || node.kind === _kinds.Kind.OBJECT_TYPE_EXTENSION || node.kind === _kinds.Kind.INTERFACE_TYPE_EXTENSION || node.kind === _kinds.Kind.UNION_TYPE_EXTENSION || node.kind === _kinds.Kind.ENUM_TYPE_EXTENSION || node.kind === _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
});

// node_modules/graphql/validation/rules/ExecutableDefinitionsRule.js
var require_ExecutableDefinitionsRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ExecutableDefinitionsRule = ExecutableDefinitionsRule;
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _predicates = require_predicates();
  function ExecutableDefinitionsRule(context) {
    return {
      Document(node) {
        for (const definition of node.definitions) {
          if (!(0, _predicates.isExecutableDefinitionNode)(definition)) {
            const defName = definition.kind === _kinds.Kind.SCHEMA_DEFINITION || definition.kind === _kinds.Kind.SCHEMA_EXTENSION ? "schema" : '"' + definition.name.value + '"';
            context.reportError(new _GraphQLError.GraphQLError(`The ${defName} definition is not executable.`, {
              nodes: definition
            }));
          }
        }
        return false;
      }
    };
  }
});

// node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.js
var require_FieldsOnCorrectTypeRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FieldsOnCorrectTypeRule = FieldsOnCorrectTypeRule;
  var _didYouMean = require_didYouMean();
  var _naturalCompare = require_naturalCompare();
  var _suggestionList = require_suggestionList();
  var _GraphQLError = require_GraphQLError();
  var _definition = require_definition();
  function FieldsOnCorrectTypeRule(context) {
    return {
      Field(node) {
        const type = context.getParentType();
        if (type) {
          const fieldDef = context.getFieldDef();
          if (!fieldDef) {
            const schema = context.getSchema();
            const fieldName = node.name.value;
            let suggestion = (0, _didYouMean.didYouMean)("to use an inline fragment on", getSuggestedTypeNames(schema, type, fieldName));
            if (suggestion === "") {
              suggestion = (0, _didYouMean.didYouMean)(getSuggestedFieldNames(type, fieldName));
            }
            context.reportError(new _GraphQLError.GraphQLError(`Cannot query field "${fieldName}" on type "${type.name}".` + suggestion, {
              nodes: node
            }));
          }
        }
      }
    };
  }
  function getSuggestedTypeNames(schema, type, fieldName) {
    if (!(0, _definition.isAbstractType)(type)) {
      return [];
    }
    const suggestedTypes = new Set;
    const usageCount = Object.create(null);
    for (const possibleType of schema.getPossibleTypes(type)) {
      if (!possibleType.getFields()[fieldName]) {
        continue;
      }
      suggestedTypes.add(possibleType);
      usageCount[possibleType.name] = 1;
      for (const possibleInterface of possibleType.getInterfaces()) {
        var _usageCount$possibleI;
        if (!possibleInterface.getFields()[fieldName]) {
          continue;
        }
        suggestedTypes.add(possibleInterface);
        usageCount[possibleInterface.name] = ((_usageCount$possibleI = usageCount[possibleInterface.name]) !== null && _usageCount$possibleI !== undefined ? _usageCount$possibleI : 0) + 1;
      }
    }
    return [...suggestedTypes].sort((typeA, typeB) => {
      const usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];
      if (usageCountDiff !== 0) {
        return usageCountDiff;
      }
      if ((0, _definition.isInterfaceType)(typeA) && schema.isSubType(typeA, typeB)) {
        return -1;
      }
      if ((0, _definition.isInterfaceType)(typeB) && schema.isSubType(typeB, typeA)) {
        return 1;
      }
      return (0, _naturalCompare.naturalCompare)(typeA.name, typeB.name);
    }).map((x) => x.name);
  }
  function getSuggestedFieldNames(type, fieldName) {
    if ((0, _definition.isObjectType)(type) || (0, _definition.isInterfaceType)(type)) {
      const possibleFieldNames = Object.keys(type.getFields());
      return (0, _suggestionList.suggestionList)(fieldName, possibleFieldNames);
    }
    return [];
  }
});

// node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.js
var require_FragmentsOnCompositeTypesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FragmentsOnCompositeTypesRule = FragmentsOnCompositeTypesRule;
  var _GraphQLError = require_GraphQLError();
  var _printer = require_printer();
  var _definition = require_definition();
  var _typeFromAST = require_typeFromAST();
  function FragmentsOnCompositeTypesRule(context) {
    return {
      InlineFragment(node) {
        const typeCondition = node.typeCondition;
        if (typeCondition) {
          const type = (0, _typeFromAST.typeFromAST)(context.getSchema(), typeCondition);
          if (type && !(0, _definition.isCompositeType)(type)) {
            const typeStr = (0, _printer.print)(typeCondition);
            context.reportError(new _GraphQLError.GraphQLError(`Fragment cannot condition on non composite type "${typeStr}".`, {
              nodes: typeCondition
            }));
          }
        }
      },
      FragmentDefinition(node) {
        const type = (0, _typeFromAST.typeFromAST)(context.getSchema(), node.typeCondition);
        if (type && !(0, _definition.isCompositeType)(type)) {
          const typeStr = (0, _printer.print)(node.typeCondition);
          context.reportError(new _GraphQLError.GraphQLError(`Fragment "${node.name.value}" cannot condition on non composite type "${typeStr}".`, {
            nodes: node.typeCondition
          }));
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/KnownArgumentNamesRule.js
var require_KnownArgumentNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.KnownArgumentNamesOnDirectivesRule = KnownArgumentNamesOnDirectivesRule;
  exports.KnownArgumentNamesRule = KnownArgumentNamesRule;
  var _didYouMean = require_didYouMean();
  var _suggestionList = require_suggestionList();
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _directives = require_directives();
  function KnownArgumentNamesRule(context) {
    return {
      ...KnownArgumentNamesOnDirectivesRule(context),
      Argument(argNode) {
        const argDef = context.getArgument();
        const fieldDef = context.getFieldDef();
        const parentType = context.getParentType();
        if (!argDef && fieldDef && parentType) {
          const argName = argNode.name.value;
          const knownArgsNames = fieldDef.args.map((arg) => arg.name);
          const suggestions = (0, _suggestionList.suggestionList)(argName, knownArgsNames);
          context.reportError(new _GraphQLError.GraphQLError(`Unknown argument "${argName}" on field "${parentType.name}.${fieldDef.name}".` + (0, _didYouMean.didYouMean)(suggestions), {
            nodes: argNode
          }));
        }
      }
    };
  }
  function KnownArgumentNamesOnDirectivesRule(context) {
    const directiveArgs = Object.create(null);
    const schema = context.getSchema();
    const definedDirectives = schema ? schema.getDirectives() : _directives.specifiedDirectives;
    for (const directive of definedDirectives) {
      directiveArgs[directive.name] = directive.args.map((arg) => arg.name);
    }
    const astDefinitions = context.getDocument().definitions;
    for (const def of astDefinitions) {
      if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
        var _def$arguments;
        const argsNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== undefined ? _def$arguments : [];
        directiveArgs[def.name.value] = argsNodes.map((arg) => arg.name.value);
      }
    }
    return {
      Directive(directiveNode) {
        const directiveName = directiveNode.name.value;
        const knownArgs = directiveArgs[directiveName];
        if (directiveNode.arguments && knownArgs) {
          for (const argNode of directiveNode.arguments) {
            const argName = argNode.name.value;
            if (!knownArgs.includes(argName)) {
              const suggestions = (0, _suggestionList.suggestionList)(argName, knownArgs);
              context.reportError(new _GraphQLError.GraphQLError(`Unknown argument "${argName}" on directive "@${directiveName}".` + (0, _didYouMean.didYouMean)(suggestions), {
                nodes: argNode
              }));
            }
          }
        }
        return false;
      }
    };
  }
});

// node_modules/graphql/validation/rules/KnownDirectivesRule.js
var require_KnownDirectivesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.KnownDirectivesRule = KnownDirectivesRule;
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _GraphQLError = require_GraphQLError();
  var _ast = require_ast();
  var _directiveLocation = require_directiveLocation();
  var _kinds = require_kinds();
  var _directives = require_directives();
  function KnownDirectivesRule(context) {
    const locationsMap = Object.create(null);
    const schema = context.getSchema();
    const definedDirectives = schema ? schema.getDirectives() : _directives.specifiedDirectives;
    for (const directive of definedDirectives) {
      locationsMap[directive.name] = directive.locations;
    }
    const astDefinitions = context.getDocument().definitions;
    for (const def of astDefinitions) {
      if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
        locationsMap[def.name.value] = def.locations.map((name) => name.value);
      }
    }
    return {
      Directive(node, _key, _parent, _path, ancestors) {
        const name = node.name.value;
        const locations = locationsMap[name];
        if (!locations) {
          context.reportError(new _GraphQLError.GraphQLError(`Unknown directive "@${name}".`, {
            nodes: node
          }));
          return;
        }
        const candidateLocation = getDirectiveLocationForASTPath(ancestors);
        if (candidateLocation && !locations.includes(candidateLocation)) {
          context.reportError(new _GraphQLError.GraphQLError(`Directive "@${name}" may not be used on ${candidateLocation}.`, {
            nodes: node
          }));
        }
      }
    };
  }
  function getDirectiveLocationForASTPath(ancestors) {
    const appliedTo = ancestors[ancestors.length - 1];
    "kind" in appliedTo || (0, _invariant.invariant)(false);
    switch (appliedTo.kind) {
      case _kinds.Kind.OPERATION_DEFINITION:
        return getDirectiveLocationForOperation(appliedTo.operation);
      case _kinds.Kind.FIELD:
        return _directiveLocation.DirectiveLocation.FIELD;
      case _kinds.Kind.FRAGMENT_SPREAD:
        return _directiveLocation.DirectiveLocation.FRAGMENT_SPREAD;
      case _kinds.Kind.INLINE_FRAGMENT:
        return _directiveLocation.DirectiveLocation.INLINE_FRAGMENT;
      case _kinds.Kind.FRAGMENT_DEFINITION:
        return _directiveLocation.DirectiveLocation.FRAGMENT_DEFINITION;
      case _kinds.Kind.VARIABLE_DEFINITION:
        return _directiveLocation.DirectiveLocation.VARIABLE_DEFINITION;
      case _kinds.Kind.SCHEMA_DEFINITION:
      case _kinds.Kind.SCHEMA_EXTENSION:
        return _directiveLocation.DirectiveLocation.SCHEMA;
      case _kinds.Kind.SCALAR_TYPE_DEFINITION:
      case _kinds.Kind.SCALAR_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.SCALAR;
      case _kinds.Kind.OBJECT_TYPE_DEFINITION:
      case _kinds.Kind.OBJECT_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.OBJECT;
      case _kinds.Kind.FIELD_DEFINITION:
        return _directiveLocation.DirectiveLocation.FIELD_DEFINITION;
      case _kinds.Kind.INTERFACE_TYPE_DEFINITION:
      case _kinds.Kind.INTERFACE_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.INTERFACE;
      case _kinds.Kind.UNION_TYPE_DEFINITION:
      case _kinds.Kind.UNION_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.UNION;
      case _kinds.Kind.ENUM_TYPE_DEFINITION:
      case _kinds.Kind.ENUM_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.ENUM;
      case _kinds.Kind.ENUM_VALUE_DEFINITION:
        return _directiveLocation.DirectiveLocation.ENUM_VALUE;
      case _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION:
      case _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION:
        return _directiveLocation.DirectiveLocation.INPUT_OBJECT;
      case _kinds.Kind.INPUT_VALUE_DEFINITION: {
        const parentNode = ancestors[ancestors.length - 3];
        "kind" in parentNode || (0, _invariant.invariant)(false);
        return parentNode.kind === _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION ? _directiveLocation.DirectiveLocation.INPUT_FIELD_DEFINITION : _directiveLocation.DirectiveLocation.ARGUMENT_DEFINITION;
      }
      default:
        (0, _invariant.invariant)(false, "Unexpected kind: " + (0, _inspect.inspect)(appliedTo.kind));
    }
  }
  function getDirectiveLocationForOperation(operation) {
    switch (operation) {
      case _ast.OperationTypeNode.QUERY:
        return _directiveLocation.DirectiveLocation.QUERY;
      case _ast.OperationTypeNode.MUTATION:
        return _directiveLocation.DirectiveLocation.MUTATION;
      case _ast.OperationTypeNode.SUBSCRIPTION:
        return _directiveLocation.DirectiveLocation.SUBSCRIPTION;
    }
  }
});

// node_modules/graphql/validation/rules/KnownFragmentNamesRule.js
var require_KnownFragmentNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.KnownFragmentNamesRule = KnownFragmentNamesRule;
  var _GraphQLError = require_GraphQLError();
  function KnownFragmentNamesRule(context) {
    return {
      FragmentSpread(node) {
        const fragmentName = node.name.value;
        const fragment = context.getFragment(fragmentName);
        if (!fragment) {
          context.reportError(new _GraphQLError.GraphQLError(`Unknown fragment "${fragmentName}".`, {
            nodes: node.name
          }));
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/KnownTypeNamesRule.js
var require_KnownTypeNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.KnownTypeNamesRule = KnownTypeNamesRule;
  var _didYouMean = require_didYouMean();
  var _suggestionList = require_suggestionList();
  var _GraphQLError = require_GraphQLError();
  var _predicates = require_predicates();
  var _introspection = require_introspection();
  var _scalars = require_scalars();
  function KnownTypeNamesRule(context) {
    const schema = context.getSchema();
    const existingTypesMap = schema ? schema.getTypeMap() : Object.create(null);
    const definedTypes = Object.create(null);
    for (const def of context.getDocument().definitions) {
      if ((0, _predicates.isTypeDefinitionNode)(def)) {
        definedTypes[def.name.value] = true;
      }
    }
    const typeNames = [
      ...Object.keys(existingTypesMap),
      ...Object.keys(definedTypes)
    ];
    return {
      NamedType(node, _1, parent, _2, ancestors) {
        const typeName = node.name.value;
        if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
          var _ancestors$;
          const definitionNode = (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== undefined ? _ancestors$ : parent;
          const isSDL = definitionNode != null && isSDLNode(definitionNode);
          if (isSDL && standardTypeNames.includes(typeName)) {
            return;
          }
          const suggestedTypes = (0, _suggestionList.suggestionList)(typeName, isSDL ? standardTypeNames.concat(typeNames) : typeNames);
          context.reportError(new _GraphQLError.GraphQLError(`Unknown type "${typeName}".` + (0, _didYouMean.didYouMean)(suggestedTypes), {
            nodes: node
          }));
        }
      }
    };
  }
  var standardTypeNames = [
    ..._scalars.specifiedScalarTypes,
    ..._introspection.introspectionTypes
  ].map((type) => type.name);
  function isSDLNode(value) {
    return "kind" in value && ((0, _predicates.isTypeSystemDefinitionNode)(value) || (0, _predicates.isTypeSystemExtensionNode)(value));
  }
});

// node_modules/graphql/validation/rules/LoneAnonymousOperationRule.js
var require_LoneAnonymousOperationRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoneAnonymousOperationRule = LoneAnonymousOperationRule;
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  function LoneAnonymousOperationRule(context) {
    let operationCount = 0;
    return {
      Document(node) {
        operationCount = node.definitions.filter((definition) => definition.kind === _kinds.Kind.OPERATION_DEFINITION).length;
      },
      OperationDefinition(node) {
        if (!node.name && operationCount > 1) {
          context.reportError(new _GraphQLError.GraphQLError("This anonymous operation must be the only defined operation.", {
            nodes: node
          }));
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.js
var require_LoneSchemaDefinitionRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoneSchemaDefinitionRule = LoneSchemaDefinitionRule;
  var _GraphQLError = require_GraphQLError();
  function LoneSchemaDefinitionRule(context) {
    var _ref, _ref2, _oldSchema$astNode;
    const oldSchema = context.getSchema();
    const alreadyDefined = (_ref = (_ref2 = (_oldSchema$astNode = oldSchema === null || oldSchema === undefined ? undefined : oldSchema.astNode) !== null && _oldSchema$astNode !== undefined ? _oldSchema$astNode : oldSchema === null || oldSchema === undefined ? undefined : oldSchema.getQueryType()) !== null && _ref2 !== undefined ? _ref2 : oldSchema === null || oldSchema === undefined ? undefined : oldSchema.getMutationType()) !== null && _ref !== undefined ? _ref : oldSchema === null || oldSchema === undefined ? undefined : oldSchema.getSubscriptionType();
    let schemaDefinitionsCount = 0;
    return {
      SchemaDefinition(node) {
        if (alreadyDefined) {
          context.reportError(new _GraphQLError.GraphQLError("Cannot define a new schema within a schema extension.", {
            nodes: node
          }));
          return;
        }
        if (schemaDefinitionsCount > 0) {
          context.reportError(new _GraphQLError.GraphQLError("Must provide only one schema definition.", {
            nodes: node
          }));
        }
        ++schemaDefinitionsCount;
      }
    };
  }
});

// node_modules/graphql/validation/rules/MaxIntrospectionDepthRule.js
var require_MaxIntrospectionDepthRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MaxIntrospectionDepthRule = MaxIntrospectionDepthRule;
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var MAX_LISTS_DEPTH = 3;
  function MaxIntrospectionDepthRule(context) {
    function checkDepth(node, visitedFragments = Object.create(null), depth = 0) {
      if (node.kind === _kinds.Kind.FRAGMENT_SPREAD) {
        const fragmentName = node.name.value;
        if (visitedFragments[fragmentName] === true) {
          return false;
        }
        const fragment = context.getFragment(fragmentName);
        if (!fragment) {
          return false;
        }
        try {
          visitedFragments[fragmentName] = true;
          return checkDepth(fragment, visitedFragments, depth);
        } finally {
          visitedFragments[fragmentName] = undefined;
        }
      }
      if (node.kind === _kinds.Kind.FIELD && (node.name.value === "fields" || node.name.value === "interfaces" || node.name.value === "possibleTypes" || node.name.value === "inputFields")) {
        depth++;
        if (depth >= MAX_LISTS_DEPTH) {
          return true;
        }
      }
      if ("selectionSet" in node && node.selectionSet) {
        for (const child of node.selectionSet.selections) {
          if (checkDepth(child, visitedFragments, depth)) {
            return true;
          }
        }
      }
      return false;
    }
    return {
      Field(node) {
        if (node.name.value === "__schema" || node.name.value === "__type") {
          if (checkDepth(node)) {
            context.reportError(new _GraphQLError.GraphQLError("Maximum introspection depth exceeded", {
              nodes: [node]
            }));
            return false;
          }
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/NoFragmentCyclesRule.js
var require_NoFragmentCyclesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NoFragmentCyclesRule = NoFragmentCyclesRule;
  var _GraphQLError = require_GraphQLError();
  function NoFragmentCyclesRule(context) {
    const visitedFrags = Object.create(null);
    const spreadPath = [];
    const spreadPathIndexByName = Object.create(null);
    return {
      OperationDefinition: () => false,
      FragmentDefinition(node) {
        detectCycleRecursive(node);
        return false;
      }
    };
    function detectCycleRecursive(fragment) {
      if (visitedFrags[fragment.name.value]) {
        return;
      }
      const fragmentName = fragment.name.value;
      visitedFrags[fragmentName] = true;
      const spreadNodes = context.getFragmentSpreads(fragment.selectionSet);
      if (spreadNodes.length === 0) {
        return;
      }
      spreadPathIndexByName[fragmentName] = spreadPath.length;
      for (const spreadNode of spreadNodes) {
        const spreadName = spreadNode.name.value;
        const cycleIndex = spreadPathIndexByName[spreadName];
        spreadPath.push(spreadNode);
        if (cycleIndex === undefined) {
          const spreadFragment = context.getFragment(spreadName);
          if (spreadFragment) {
            detectCycleRecursive(spreadFragment);
          }
        } else {
          const cyclePath = spreadPath.slice(cycleIndex);
          const viaPath = cyclePath.slice(0, -1).map((s) => '"' + s.name.value + '"').join(", ");
          context.reportError(new _GraphQLError.GraphQLError(`Cannot spread fragment "${spreadName}" within itself` + (viaPath !== "" ? ` via ${viaPath}.` : "."), {
            nodes: cyclePath
          }));
        }
        spreadPath.pop();
      }
      spreadPathIndexByName[fragmentName] = undefined;
    }
  }
});

// node_modules/graphql/validation/rules/NoUndefinedVariablesRule.js
var require_NoUndefinedVariablesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NoUndefinedVariablesRule = NoUndefinedVariablesRule;
  var _GraphQLError = require_GraphQLError();
  function NoUndefinedVariablesRule(context) {
    let variableNameDefined = Object.create(null);
    return {
      OperationDefinition: {
        enter() {
          variableNameDefined = Object.create(null);
        },
        leave(operation) {
          const usages = context.getRecursiveVariableUsages(operation);
          for (const { node } of usages) {
            const varName = node.name.value;
            if (variableNameDefined[varName] !== true) {
              context.reportError(new _GraphQLError.GraphQLError(operation.name ? `Variable "$${varName}" is not defined by operation "${operation.name.value}".` : `Variable "$${varName}" is not defined.`, {
                nodes: [node, operation]
              }));
            }
          }
        }
      },
      VariableDefinition(node) {
        variableNameDefined[node.variable.name.value] = true;
      }
    };
  }
});

// node_modules/graphql/validation/rules/NoUnusedFragmentsRule.js
var require_NoUnusedFragmentsRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NoUnusedFragmentsRule = NoUnusedFragmentsRule;
  var _GraphQLError = require_GraphQLError();
  function NoUnusedFragmentsRule(context) {
    const operationDefs = [];
    const fragmentDefs = [];
    return {
      OperationDefinition(node) {
        operationDefs.push(node);
        return false;
      },
      FragmentDefinition(node) {
        fragmentDefs.push(node);
        return false;
      },
      Document: {
        leave() {
          const fragmentNameUsed = Object.create(null);
          for (const operation of operationDefs) {
            for (const fragment of context.getRecursivelyReferencedFragments(operation)) {
              fragmentNameUsed[fragment.name.value] = true;
            }
          }
          for (const fragmentDef of fragmentDefs) {
            const fragName = fragmentDef.name.value;
            if (fragmentNameUsed[fragName] !== true) {
              context.reportError(new _GraphQLError.GraphQLError(`Fragment "${fragName}" is never used.`, {
                nodes: fragmentDef
              }));
            }
          }
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/NoUnusedVariablesRule.js
var require_NoUnusedVariablesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NoUnusedVariablesRule = NoUnusedVariablesRule;
  var _GraphQLError = require_GraphQLError();
  function NoUnusedVariablesRule(context) {
    let variableDefs = [];
    return {
      OperationDefinition: {
        enter() {
          variableDefs = [];
        },
        leave(operation) {
          const variableNameUsed = Object.create(null);
          const usages = context.getRecursiveVariableUsages(operation);
          for (const { node } of usages) {
            variableNameUsed[node.name.value] = true;
          }
          for (const variableDef of variableDefs) {
            const variableName = variableDef.variable.name.value;
            if (variableNameUsed[variableName] !== true) {
              context.reportError(new _GraphQLError.GraphQLError(operation.name ? `Variable "$${variableName}" is never used in operation "${operation.name.value}".` : `Variable "$${variableName}" is never used.`, {
                nodes: variableDef
              }));
            }
          }
        }
      },
      VariableDefinition(def) {
        variableDefs.push(def);
      }
    };
  }
});

// node_modules/graphql/utilities/sortValueNode.js
var require_sortValueNode = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.sortValueNode = sortValueNode;
  var _naturalCompare = require_naturalCompare();
  var _kinds = require_kinds();
  function sortValueNode(valueNode) {
    switch (valueNode.kind) {
      case _kinds.Kind.OBJECT:
        return { ...valueNode, fields: sortFields(valueNode.fields) };
      case _kinds.Kind.LIST:
        return { ...valueNode, values: valueNode.values.map(sortValueNode) };
      case _kinds.Kind.INT:
      case _kinds.Kind.FLOAT:
      case _kinds.Kind.STRING:
      case _kinds.Kind.BOOLEAN:
      case _kinds.Kind.NULL:
      case _kinds.Kind.ENUM:
      case _kinds.Kind.VARIABLE:
        return valueNode;
    }
  }
  function sortFields(fields) {
    return fields.map((fieldNode) => ({
      ...fieldNode,
      value: sortValueNode(fieldNode.value)
    })).sort((fieldA, fieldB) => (0, _naturalCompare.naturalCompare)(fieldA.name.value, fieldB.name.value));
  }
});

// node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.js
var require_OverlappingFieldsCanBeMergedRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OverlappingFieldsCanBeMergedRule = OverlappingFieldsCanBeMergedRule;
  var _inspect = require_inspect();
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _printer = require_printer();
  var _definition = require_definition();
  var _sortValueNode = require_sortValueNode();
  var _typeFromAST = require_typeFromAST();
  function reasonMessage(reason) {
    if (Array.isArray(reason)) {
      return reason.map(([responseName, subReason]) => `subfields "${responseName}" conflict because ` + reasonMessage(subReason)).join(" and ");
    }
    return reason;
  }
  function OverlappingFieldsCanBeMergedRule(context) {
    const comparedFieldsAndFragmentPairs = new OrderedPairSet;
    const comparedFragmentPairs = new PairSet;
    const cachedFieldsAndFragmentNames = new Map;
    return {
      SelectionSet(selectionSet) {
        const conflicts = findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, context.getParentType(), selectionSet);
        for (const [[responseName, reason], fields1, fields2] of conflicts) {
          const reasonMsg = reasonMessage(reason);
          context.reportError(new _GraphQLError.GraphQLError(`Fields "${responseName}" conflict because ${reasonMsg}. Use different aliases on the fields to fetch both if this was intentional.`, {
            nodes: fields1.concat(fields2)
          }));
        }
      }
    };
  }
  function findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentType, selectionSet) {
    const conflicts = [];
    const [fieldMap, fragmentNames] = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet);
    collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, fieldMap);
    if (fragmentNames.length !== 0) {
      for (let i = 0;i < fragmentNames.length; i++) {
        collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, false, fieldMap, fragmentNames[i]);
        for (let j = i + 1;j < fragmentNames.length; j++) {
          collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, false, fragmentNames[i], fragmentNames[j]);
        }
      }
    }
    return conflicts;
  }
  function collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentName) {
    if (comparedFieldsAndFragmentPairs.has(fieldMap, fragmentName, areMutuallyExclusive)) {
      return;
    }
    comparedFieldsAndFragmentPairs.add(fieldMap, fragmentName, areMutuallyExclusive);
    const fragment = context.getFragment(fragmentName);
    if (!fragment) {
      return;
    }
    const [fieldMap2, referencedFragmentNames] = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment);
    if (fieldMap === fieldMap2) {
      return;
    }
    collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fieldMap2);
    for (const referencedFragmentName of referencedFragmentNames) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fieldMap, referencedFragmentName);
    }
  }
  function collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2) {
    if (fragmentName1 === fragmentName2) {
      return;
    }
    if (comparedFragmentPairs.has(fragmentName1, fragmentName2, areMutuallyExclusive)) {
      return;
    }
    comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
    const fragment1 = context.getFragment(fragmentName1);
    const fragment2 = context.getFragment(fragmentName2);
    if (!fragment1 || !fragment2) {
      return;
    }
    const [fieldMap1, referencedFragmentNames1] = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment1);
    const [fieldMap2, referencedFragmentNames2] = getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment2);
    collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2);
    for (const referencedFragmentName2 of referencedFragmentNames2) {
      collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, referencedFragmentName2);
    }
    for (const referencedFragmentName1 of referencedFragmentNames1) {
      collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, referencedFragmentName1, fragmentName2);
    }
  }
  function findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, parentType1, selectionSet1, parentType2, selectionSet2) {
    const conflicts = [];
    const [fieldMap1, fragmentNames1] = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType1, selectionSet1);
    const [fieldMap2, fragmentNames2] = getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType2, selectionSet2);
    collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fieldMap2);
    for (const fragmentName2 of fragmentNames2) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fieldMap1, fragmentName2);
    }
    for (const fragmentName1 of fragmentNames1) {
      collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fieldMap2, fragmentName1);
    }
    for (const fragmentName1 of fragmentNames1) {
      for (const fragmentName2 of fragmentNames2) {
        collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2);
      }
    }
    return conflicts;
  }
  function collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, fieldMap) {
    for (const [responseName, fields] of Object.entries(fieldMap)) {
      if (fields.length > 1) {
        for (let i = 0;i < fields.length; i++) {
          for (let j = i + 1;j < fields.length; j++) {
            const conflict = findConflict(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, false, responseName, fields[i], fields[j]);
            if (conflict) {
              conflicts.push(conflict);
            }
          }
        }
      }
    }
  }
  function collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, fieldMap1, fieldMap2) {
    for (const [responseName, fields1] of Object.entries(fieldMap1)) {
      const fields2 = fieldMap2[responseName];
      if (fields2) {
        for (const field1 of fields1) {
          for (const field2 of fields2) {
            const conflict = findConflict(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2);
            if (conflict) {
              conflicts.push(conflict);
            }
          }
        }
      }
    }
  }
  function findConflict(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2) {
    const [parentType1, node1, def1] = field1;
    const [parentType2, node2, def2] = field2;
    const areMutuallyExclusive = parentFieldsAreMutuallyExclusive || parentType1 !== parentType2 && (0, _definition.isObjectType)(parentType1) && (0, _definition.isObjectType)(parentType2);
    if (!areMutuallyExclusive) {
      const name1 = node1.name.value;
      const name2 = node2.name.value;
      if (name1 !== name2) {
        return [
          [responseName, `"${name1}" and "${name2}" are different fields`],
          [node1],
          [node2]
        ];
      }
      if (!sameArguments(node1, node2)) {
        return [
          [responseName, "they have differing arguments"],
          [node1],
          [node2]
        ];
      }
    }
    const type1 = def1 === null || def1 === undefined ? undefined : def1.type;
    const type2 = def2 === null || def2 === undefined ? undefined : def2.type;
    if (type1 && type2 && doTypesConflict(type1, type2)) {
      return [
        [
          responseName,
          `they return conflicting types "${(0, _inspect.inspect)(type1)}" and "${(0, _inspect.inspect)(type2)}"`
        ],
        [node1],
        [node2]
      ];
    }
    const selectionSet1 = node1.selectionSet;
    const selectionSet2 = node2.selectionSet;
    if (selectionSet1 && selectionSet2) {
      const conflicts = findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFieldsAndFragmentPairs, comparedFragmentPairs, areMutuallyExclusive, (0, _definition.getNamedType)(type1), selectionSet1, (0, _definition.getNamedType)(type2), selectionSet2);
      return subfieldConflicts(conflicts, responseName, node1, node2);
    }
  }
  function sameArguments(node1, node2) {
    const args1 = node1.arguments;
    const args2 = node2.arguments;
    if (args1 === undefined || args1.length === 0) {
      return args2 === undefined || args2.length === 0;
    }
    if (args2 === undefined || args2.length === 0) {
      return false;
    }
    if (args1.length !== args2.length) {
      return false;
    }
    const values2 = new Map(args2.map(({ name, value }) => [name.value, value]));
    return args1.every((arg1) => {
      const value1 = arg1.value;
      const value2 = values2.get(arg1.name.value);
      if (value2 === undefined) {
        return false;
      }
      return stringifyValue(value1) === stringifyValue(value2);
    });
  }
  function stringifyValue(value) {
    return (0, _printer.print)((0, _sortValueNode.sortValueNode)(value));
  }
  function doTypesConflict(type1, type2) {
    if ((0, _definition.isListType)(type1)) {
      return (0, _definition.isListType)(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
    }
    if ((0, _definition.isListType)(type2)) {
      return true;
    }
    if ((0, _definition.isNonNullType)(type1)) {
      return (0, _definition.isNonNullType)(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
    }
    if ((0, _definition.isNonNullType)(type2)) {
      return true;
    }
    if ((0, _definition.isLeafType)(type1) || (0, _definition.isLeafType)(type2)) {
      return type1 !== type2;
    }
    return false;
  }
  function getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet) {
    const cached = cachedFieldsAndFragmentNames.get(selectionSet);
    if (cached) {
      return cached;
    }
    const nodeAndDefs = Object.create(null);
    const fragmentNames = Object.create(null);
    _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames);
    const result = [nodeAndDefs, Object.keys(fragmentNames)];
    cachedFieldsAndFragmentNames.set(selectionSet, result);
    return result;
  }
  function getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment) {
    const cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);
    if (cached) {
      return cached;
    }
    const fragmentType = (0, _typeFromAST.typeFromAST)(context.getSchema(), fragment.typeCondition);
    return getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragmentType, fragment.selectionSet);
  }
  function _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames) {
    for (const selection of selectionSet.selections) {
      switch (selection.kind) {
        case _kinds.Kind.FIELD: {
          const fieldName = selection.name.value;
          let fieldDef;
          if ((0, _definition.isObjectType)(parentType) || (0, _definition.isInterfaceType)(parentType)) {
            fieldDef = parentType.getFields()[fieldName];
          }
          const responseName = selection.alias ? selection.alias.value : fieldName;
          if (!nodeAndDefs[responseName]) {
            nodeAndDefs[responseName] = [];
          }
          nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
          break;
        }
        case _kinds.Kind.FRAGMENT_SPREAD:
          fragmentNames[selection.name.value] = true;
          break;
        case _kinds.Kind.INLINE_FRAGMENT: {
          const typeCondition = selection.typeCondition;
          const inlineFragmentType = typeCondition ? (0, _typeFromAST.typeFromAST)(context.getSchema(), typeCondition) : parentType;
          _collectFieldsAndFragmentNames(context, inlineFragmentType, selection.selectionSet, nodeAndDefs, fragmentNames);
          break;
        }
      }
    }
  }
  function subfieldConflicts(conflicts, responseName, node1, node2) {
    if (conflicts.length > 0) {
      return [
        [responseName, conflicts.map(([reason]) => reason)],
        [node1, ...conflicts.map(([, fields1]) => fields1).flat()],
        [node2, ...conflicts.map(([, , fields2]) => fields2).flat()]
      ];
    }
  }

  class OrderedPairSet {
    constructor() {
      this._data = new Map;
    }
    has(a, b, weaklyPresent) {
      var _this$_data$get;
      const result = (_this$_data$get = this._data.get(a)) === null || _this$_data$get === undefined ? undefined : _this$_data$get.get(b);
      if (result === undefined) {
        return false;
      }
      return weaklyPresent ? true : weaklyPresent === result;
    }
    add(a, b, weaklyPresent) {
      const map2 = this._data.get(a);
      if (map2 === undefined) {
        this._data.set(a, new Map([[b, weaklyPresent]]));
      } else {
        map2.set(b, weaklyPresent);
      }
    }
  }

  class PairSet {
    constructor() {
      this._orderedPairSet = new OrderedPairSet;
    }
    has(a, b, weaklyPresent) {
      return a < b ? this._orderedPairSet.has(a, b, weaklyPresent) : this._orderedPairSet.has(b, a, weaklyPresent);
    }
    add(a, b, weaklyPresent) {
      if (a < b) {
        this._orderedPairSet.add(a, b, weaklyPresent);
      } else {
        this._orderedPairSet.add(b, a, weaklyPresent);
      }
    }
  }
});

// node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.js
var require_PossibleFragmentSpreadsRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PossibleFragmentSpreadsRule = PossibleFragmentSpreadsRule;
  var _inspect = require_inspect();
  var _GraphQLError = require_GraphQLError();
  var _definition = require_definition();
  var _typeComparators = require_typeComparators();
  var _typeFromAST = require_typeFromAST();
  function PossibleFragmentSpreadsRule(context) {
    return {
      InlineFragment(node) {
        const fragType = context.getType();
        const parentType = context.getParentType();
        if ((0, _definition.isCompositeType)(fragType) && (0, _definition.isCompositeType)(parentType) && !(0, _typeComparators.doTypesOverlap)(context.getSchema(), fragType, parentType)) {
          const parentTypeStr = (0, _inspect.inspect)(parentType);
          const fragTypeStr = (0, _inspect.inspect)(fragType);
          context.reportError(new _GraphQLError.GraphQLError(`Fragment cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`, {
            nodes: node
          }));
        }
      },
      FragmentSpread(node) {
        const fragName = node.name.value;
        const fragType = getFragmentType(context, fragName);
        const parentType = context.getParentType();
        if (fragType && parentType && !(0, _typeComparators.doTypesOverlap)(context.getSchema(), fragType, parentType)) {
          const parentTypeStr = (0, _inspect.inspect)(parentType);
          const fragTypeStr = (0, _inspect.inspect)(fragType);
          context.reportError(new _GraphQLError.GraphQLError(`Fragment "${fragName}" cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`, {
            nodes: node
          }));
        }
      }
    };
  }
  function getFragmentType(context, name) {
    const frag = context.getFragment(name);
    if (frag) {
      const type = (0, _typeFromAST.typeFromAST)(context.getSchema(), frag.typeCondition);
      if ((0, _definition.isCompositeType)(type)) {
        return type;
      }
    }
  }
});

// node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.js
var require_PossibleTypeExtensionsRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PossibleTypeExtensionsRule = PossibleTypeExtensionsRule;
  var _didYouMean = require_didYouMean();
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _suggestionList = require_suggestionList();
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _predicates = require_predicates();
  var _definition = require_definition();
  function PossibleTypeExtensionsRule(context) {
    const schema = context.getSchema();
    const definedTypes = Object.create(null);
    for (const def of context.getDocument().definitions) {
      if ((0, _predicates.isTypeDefinitionNode)(def)) {
        definedTypes[def.name.value] = def;
      }
    }
    return {
      ScalarTypeExtension: checkExtension,
      ObjectTypeExtension: checkExtension,
      InterfaceTypeExtension: checkExtension,
      UnionTypeExtension: checkExtension,
      EnumTypeExtension: checkExtension,
      InputObjectTypeExtension: checkExtension
    };
    function checkExtension(node) {
      const typeName = node.name.value;
      const defNode = definedTypes[typeName];
      const existingType = schema === null || schema === undefined ? undefined : schema.getType(typeName);
      let expectedKind;
      if (defNode) {
        expectedKind = defKindToExtKind[defNode.kind];
      } else if (existingType) {
        expectedKind = typeToExtKind(existingType);
      }
      if (expectedKind) {
        if (expectedKind !== node.kind) {
          const kindStr = extensionKindToTypeName(node.kind);
          context.reportError(new _GraphQLError.GraphQLError(`Cannot extend non-${kindStr} type "${typeName}".`, {
            nodes: defNode ? [defNode, node] : node
          }));
        }
      } else {
        const allTypeNames = Object.keys({
          ...definedTypes,
          ...schema === null || schema === undefined ? undefined : schema.getTypeMap()
        });
        const suggestedTypes = (0, _suggestionList.suggestionList)(typeName, allTypeNames);
        context.reportError(new _GraphQLError.GraphQLError(`Cannot extend type "${typeName}" because it is not defined.` + (0, _didYouMean.didYouMean)(suggestedTypes), {
          nodes: node.name
        }));
      }
    }
  }
  var defKindToExtKind = {
    [_kinds.Kind.SCALAR_TYPE_DEFINITION]: _kinds.Kind.SCALAR_TYPE_EXTENSION,
    [_kinds.Kind.OBJECT_TYPE_DEFINITION]: _kinds.Kind.OBJECT_TYPE_EXTENSION,
    [_kinds.Kind.INTERFACE_TYPE_DEFINITION]: _kinds.Kind.INTERFACE_TYPE_EXTENSION,
    [_kinds.Kind.UNION_TYPE_DEFINITION]: _kinds.Kind.UNION_TYPE_EXTENSION,
    [_kinds.Kind.ENUM_TYPE_DEFINITION]: _kinds.Kind.ENUM_TYPE_EXTENSION,
    [_kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION]: _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION
  };
  function typeToExtKind(type) {
    if ((0, _definition.isScalarType)(type)) {
      return _kinds.Kind.SCALAR_TYPE_EXTENSION;
    }
    if ((0, _definition.isObjectType)(type)) {
      return _kinds.Kind.OBJECT_TYPE_EXTENSION;
    }
    if ((0, _definition.isInterfaceType)(type)) {
      return _kinds.Kind.INTERFACE_TYPE_EXTENSION;
    }
    if ((0, _definition.isUnionType)(type)) {
      return _kinds.Kind.UNION_TYPE_EXTENSION;
    }
    if ((0, _definition.isEnumType)(type)) {
      return _kinds.Kind.ENUM_TYPE_EXTENSION;
    }
    if ((0, _definition.isInputObjectType)(type)) {
      return _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION;
    }
    (0, _invariant.invariant)(false, "Unexpected type: " + (0, _inspect.inspect)(type));
  }
  function extensionKindToTypeName(kind) {
    switch (kind) {
      case _kinds.Kind.SCALAR_TYPE_EXTENSION:
        return "scalar";
      case _kinds.Kind.OBJECT_TYPE_EXTENSION:
        return "object";
      case _kinds.Kind.INTERFACE_TYPE_EXTENSION:
        return "interface";
      case _kinds.Kind.UNION_TYPE_EXTENSION:
        return "union";
      case _kinds.Kind.ENUM_TYPE_EXTENSION:
        return "enum";
      case _kinds.Kind.INPUT_OBJECT_TYPE_EXTENSION:
        return "input object";
      default:
        (0, _invariant.invariant)(false, "Unexpected kind: " + (0, _inspect.inspect)(kind));
    }
  }
});

// node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.js
var require_ProvidedRequiredArgumentsRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProvidedRequiredArgumentsOnDirectivesRule = ProvidedRequiredArgumentsOnDirectivesRule;
  exports.ProvidedRequiredArgumentsRule = ProvidedRequiredArgumentsRule;
  var _inspect = require_inspect();
  var _keyMap = require_keyMap();
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _printer = require_printer();
  var _definition = require_definition();
  var _directives = require_directives();
  function ProvidedRequiredArgumentsRule(context) {
    return {
      ...ProvidedRequiredArgumentsOnDirectivesRule(context),
      Field: {
        leave(fieldNode) {
          var _fieldNode$arguments;
          const fieldDef = context.getFieldDef();
          if (!fieldDef) {
            return false;
          }
          const providedArgs = new Set((_fieldNode$arguments = fieldNode.arguments) === null || _fieldNode$arguments === undefined ? undefined : _fieldNode$arguments.map((arg) => arg.name.value));
          for (const argDef of fieldDef.args) {
            if (!providedArgs.has(argDef.name) && (0, _definition.isRequiredArgument)(argDef)) {
              const argTypeStr = (0, _inspect.inspect)(argDef.type);
              context.reportError(new _GraphQLError.GraphQLError(`Field "${fieldDef.name}" argument "${argDef.name}" of type "${argTypeStr}" is required, but it was not provided.`, {
                nodes: fieldNode
              }));
            }
          }
        }
      }
    };
  }
  function ProvidedRequiredArgumentsOnDirectivesRule(context) {
    var _schema$getDirectives;
    const requiredArgsMap = Object.create(null);
    const schema = context.getSchema();
    const definedDirectives = (_schema$getDirectives = schema === null || schema === undefined ? undefined : schema.getDirectives()) !== null && _schema$getDirectives !== undefined ? _schema$getDirectives : _directives.specifiedDirectives;
    for (const directive of definedDirectives) {
      requiredArgsMap[directive.name] = (0, _keyMap.keyMap)(directive.args.filter(_definition.isRequiredArgument), (arg) => arg.name);
    }
    const astDefinitions = context.getDocument().definitions;
    for (const def of astDefinitions) {
      if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
        var _def$arguments;
        const argNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== undefined ? _def$arguments : [];
        requiredArgsMap[def.name.value] = (0, _keyMap.keyMap)(argNodes.filter(isRequiredArgumentNode), (arg) => arg.name.value);
      }
    }
    return {
      Directive: {
        leave(directiveNode) {
          const directiveName = directiveNode.name.value;
          const requiredArgs = requiredArgsMap[directiveName];
          if (requiredArgs) {
            var _directiveNode$argume;
            const argNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== undefined ? _directiveNode$argume : [];
            const argNodeMap = new Set(argNodes.map((arg) => arg.name.value));
            for (const [argName, argDef] of Object.entries(requiredArgs)) {
              if (!argNodeMap.has(argName)) {
                const argType = (0, _definition.isType)(argDef.type) ? (0, _inspect.inspect)(argDef.type) : (0, _printer.print)(argDef.type);
                context.reportError(new _GraphQLError.GraphQLError(`Directive "@${directiveName}" argument "${argName}" of type "${argType}" is required, but it was not provided.`, {
                  nodes: directiveNode
                }));
              }
            }
          }
        }
      }
    };
  }
  function isRequiredArgumentNode(arg) {
    return arg.type.kind === _kinds.Kind.NON_NULL_TYPE && arg.defaultValue == null;
  }
});

// node_modules/graphql/validation/rules/ScalarLeafsRule.js
var require_ScalarLeafsRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ScalarLeafsRule = ScalarLeafsRule;
  var _inspect = require_inspect();
  var _GraphQLError = require_GraphQLError();
  var _definition = require_definition();
  function ScalarLeafsRule(context) {
    return {
      Field(node) {
        const type = context.getType();
        const selectionSet = node.selectionSet;
        if (type) {
          if ((0, _definition.isLeafType)((0, _definition.getNamedType)(type))) {
            if (selectionSet) {
              const fieldName = node.name.value;
              const typeStr = (0, _inspect.inspect)(type);
              context.reportError(new _GraphQLError.GraphQLError(`Field "${fieldName}" must not have a selection since type "${typeStr}" has no subfields.`, {
                nodes: selectionSet
              }));
            }
          } else if (!selectionSet) {
            const fieldName = node.name.value;
            const typeStr = (0, _inspect.inspect)(type);
            context.reportError(new _GraphQLError.GraphQLError(`Field "${fieldName}" of type "${typeStr}" must have a selection of subfields. Did you mean "${fieldName} { ... }"?`, {
              nodes: node
            }));
          } else if (selectionSet.selections.length === 0) {
            const fieldName = node.name.value;
            const typeStr = (0, _inspect.inspect)(type);
            context.reportError(new _GraphQLError.GraphQLError(`Field "${fieldName}" of type "${typeStr}" must have at least one field selected.`, {
              nodes: node
            }));
          }
        }
      }
    };
  }
});

// node_modules/graphql/jsutils/printPathArray.js
var require_printPathArray = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.printPathArray = printPathArray;
  function printPathArray(path) {
    return path.map((key) => typeof key === "number" ? "[" + key.toString() + "]" : "." + key).join("");
  }
});

// node_modules/graphql/jsutils/Path.js
var require_Path = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.addPath = addPath;
  exports.pathToArray = pathToArray;
  function addPath(prev, key, typename) {
    return {
      prev,
      key,
      typename
    };
  }
  function pathToArray(path) {
    const flattened = [];
    let curr = path;
    while (curr) {
      flattened.push(curr.key);
      curr = curr.prev;
    }
    return flattened.reverse();
  }
});

// node_modules/graphql/utilities/coerceInputValue.js
var require_coerceInputValue = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.coerceInputValue = coerceInputValue;
  var _didYouMean = require_didYouMean();
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _isIterableObject = require_isIterableObject();
  var _isObjectLike = require_isObjectLike();
  var _Path = require_Path();
  var _printPathArray = require_printPathArray();
  var _suggestionList = require_suggestionList();
  var _GraphQLError = require_GraphQLError();
  var _definition = require_definition();
  function coerceInputValue(inputValue, type, onError = defaultOnError) {
    return coerceInputValueImpl(inputValue, type, onError, undefined);
  }
  function defaultOnError(path, invalidValue, error) {
    let errorPrefix = "Invalid value " + (0, _inspect.inspect)(invalidValue);
    if (path.length > 0) {
      errorPrefix += ` at "value${(0, _printPathArray.printPathArray)(path)}"`;
    }
    error.message = errorPrefix + ": " + error.message;
    throw error;
  }
  function coerceInputValueImpl(inputValue, type, onError, path) {
    if ((0, _definition.isNonNullType)(type)) {
      if (inputValue != null) {
        return coerceInputValueImpl(inputValue, type.ofType, onError, path);
      }
      onError((0, _Path.pathToArray)(path), inputValue, new _GraphQLError.GraphQLError(`Expected non-nullable type "${(0, _inspect.inspect)(type)}" not to be null.`));
      return;
    }
    if (inputValue == null) {
      return null;
    }
    if ((0, _definition.isListType)(type)) {
      const itemType = type.ofType;
      if ((0, _isIterableObject.isIterableObject)(inputValue)) {
        return Array.from(inputValue, (itemValue, index) => {
          const itemPath = (0, _Path.addPath)(path, index, undefined);
          return coerceInputValueImpl(itemValue, itemType, onError, itemPath);
        });
      }
      return [coerceInputValueImpl(inputValue, itemType, onError, path)];
    }
    if ((0, _definition.isInputObjectType)(type)) {
      if (!(0, _isObjectLike.isObjectLike)(inputValue) || Array.isArray(inputValue)) {
        onError((0, _Path.pathToArray)(path), inputValue, new _GraphQLError.GraphQLError(`Expected type "${type.name}" to be an object.`));
        return;
      }
      const coercedValue = {};
      const fieldDefs = type.getFields();
      for (const field of Object.values(fieldDefs)) {
        const fieldValue = inputValue[field.name];
        if (fieldValue === undefined) {
          if (field.defaultValue !== undefined) {
            coercedValue[field.name] = field.defaultValue;
          } else if ((0, _definition.isNonNullType)(field.type)) {
            const typeStr = (0, _inspect.inspect)(field.type);
            onError((0, _Path.pathToArray)(path), inputValue, new _GraphQLError.GraphQLError(`Field "${field.name}" of required type "${typeStr}" was not provided.`));
          }
          continue;
        }
        coercedValue[field.name] = coerceInputValueImpl(fieldValue, field.type, onError, (0, _Path.addPath)(path, field.name, type.name));
      }
      for (const fieldName of Object.keys(inputValue)) {
        if (!fieldDefs[fieldName]) {
          const suggestions = (0, _suggestionList.suggestionList)(fieldName, Object.keys(type.getFields()));
          onError((0, _Path.pathToArray)(path), inputValue, new _GraphQLError.GraphQLError(`Field "${fieldName}" is not defined by type "${type.name}".` + (0, _didYouMean.didYouMean)(suggestions)));
        }
      }
      if (type.isOneOf) {
        const keys = Object.keys(coercedValue);
        if (keys.length !== 1) {
          onError((0, _Path.pathToArray)(path), inputValue, new _GraphQLError.GraphQLError(`Exactly one key must be specified for OneOf type "${type.name}".`));
        }
        const key = keys[0];
        const value = coercedValue[key];
        if (value === null) {
          onError((0, _Path.pathToArray)(path).concat(key), value, new _GraphQLError.GraphQLError(`Field "${key}" must be non-null.`));
        }
      }
      return coercedValue;
    }
    if ((0, _definition.isLeafType)(type)) {
      let parseResult;
      try {
        parseResult = type.parseValue(inputValue);
      } catch (error) {
        if (error instanceof _GraphQLError.GraphQLError) {
          onError((0, _Path.pathToArray)(path), inputValue, error);
        } else {
          onError((0, _Path.pathToArray)(path), inputValue, new _GraphQLError.GraphQLError(`Expected type "${type.name}". ` + error.message, {
            originalError: error
          }));
        }
        return;
      }
      if (parseResult === undefined) {
        onError((0, _Path.pathToArray)(path), inputValue, new _GraphQLError.GraphQLError(`Expected type "${type.name}".`));
      }
      return parseResult;
    }
    (0, _invariant.invariant)(false, "Unexpected input type: " + (0, _inspect.inspect)(type));
  }
});

// node_modules/graphql/utilities/valueFromAST.js
var require_valueFromAST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.valueFromAST = valueFromAST;
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _keyMap = require_keyMap();
  var _kinds = require_kinds();
  var _definition = require_definition();
  function valueFromAST(valueNode, type, variables) {
    if (!valueNode) {
      return;
    }
    if (valueNode.kind === _kinds.Kind.VARIABLE) {
      const variableName = valueNode.name.value;
      if (variables == null || variables[variableName] === undefined) {
        return;
      }
      const variableValue = variables[variableName];
      if (variableValue === null && (0, _definition.isNonNullType)(type)) {
        return;
      }
      return variableValue;
    }
    if ((0, _definition.isNonNullType)(type)) {
      if (valueNode.kind === _kinds.Kind.NULL) {
        return;
      }
      return valueFromAST(valueNode, type.ofType, variables);
    }
    if (valueNode.kind === _kinds.Kind.NULL) {
      return null;
    }
    if ((0, _definition.isListType)(type)) {
      const itemType = type.ofType;
      if (valueNode.kind === _kinds.Kind.LIST) {
        const coercedValues = [];
        for (const itemNode of valueNode.values) {
          if (isMissingVariable(itemNode, variables)) {
            if ((0, _definition.isNonNullType)(itemType)) {
              return;
            }
            coercedValues.push(null);
          } else {
            const itemValue = valueFromAST(itemNode, itemType, variables);
            if (itemValue === undefined) {
              return;
            }
            coercedValues.push(itemValue);
          }
        }
        return coercedValues;
      }
      const coercedValue = valueFromAST(valueNode, itemType, variables);
      if (coercedValue === undefined) {
        return;
      }
      return [coercedValue];
    }
    if ((0, _definition.isInputObjectType)(type)) {
      if (valueNode.kind !== _kinds.Kind.OBJECT) {
        return;
      }
      const coercedObj = Object.create(null);
      const fieldNodes = (0, _keyMap.keyMap)(valueNode.fields, (field) => field.name.value);
      for (const field of Object.values(type.getFields())) {
        const fieldNode = fieldNodes[field.name];
        if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
          if (field.defaultValue !== undefined) {
            coercedObj[field.name] = field.defaultValue;
          } else if ((0, _definition.isNonNullType)(field.type)) {
            return;
          }
          continue;
        }
        const fieldValue = valueFromAST(fieldNode.value, field.type, variables);
        if (fieldValue === undefined) {
          return;
        }
        coercedObj[field.name] = fieldValue;
      }
      if (type.isOneOf) {
        const keys = Object.keys(coercedObj);
        if (keys.length !== 1) {
          return;
        }
        if (coercedObj[keys[0]] === null) {
          return;
        }
      }
      return coercedObj;
    }
    if ((0, _definition.isLeafType)(type)) {
      let result;
      try {
        result = type.parseLiteral(valueNode, variables);
      } catch (_error) {
        return;
      }
      if (result === undefined) {
        return;
      }
      return result;
    }
    (0, _invariant.invariant)(false, "Unexpected input type: " + (0, _inspect.inspect)(type));
  }
  function isMissingVariable(valueNode, variables) {
    return valueNode.kind === _kinds.Kind.VARIABLE && (variables == null || variables[valueNode.name.value] === undefined);
  }
});

// node_modules/graphql/execution/values.js
var require_values = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getArgumentValues = getArgumentValues;
  exports.getDirectiveValues = getDirectiveValues;
  exports.getVariableValues = getVariableValues;
  var _inspect = require_inspect();
  var _keyMap = require_keyMap();
  var _printPathArray = require_printPathArray();
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _printer = require_printer();
  var _definition = require_definition();
  var _coerceInputValue = require_coerceInputValue();
  var _typeFromAST = require_typeFromAST();
  var _valueFromAST = require_valueFromAST();
  function getVariableValues(schema, varDefNodes, inputs, options) {
    const errors2 = [];
    const maxErrors = options === null || options === undefined ? undefined : options.maxErrors;
    try {
      const coerced = coerceVariableValues(schema, varDefNodes, inputs, (error) => {
        if (maxErrors != null && errors2.length >= maxErrors) {
          throw new _GraphQLError.GraphQLError("Too many errors processing variables, error limit reached. Execution aborted.");
        }
        errors2.push(error);
      });
      if (errors2.length === 0) {
        return {
          coerced
        };
      }
    } catch (error) {
      errors2.push(error);
    }
    return {
      errors: errors2
    };
  }
  function coerceVariableValues(schema, varDefNodes, inputs, onError) {
    const coercedValues = {};
    for (const varDefNode of varDefNodes) {
      const varName = varDefNode.variable.name.value;
      const varType = (0, _typeFromAST.typeFromAST)(schema, varDefNode.type);
      if (!(0, _definition.isInputType)(varType)) {
        const varTypeStr = (0, _printer.print)(varDefNode.type);
        onError(new _GraphQLError.GraphQLError(`Variable "$${varName}" expected value of type "${varTypeStr}" which cannot be used as an input type.`, {
          nodes: varDefNode.type
        }));
        continue;
      }
      if (!hasOwnProperty(inputs, varName)) {
        if (varDefNode.defaultValue) {
          coercedValues[varName] = (0, _valueFromAST.valueFromAST)(varDefNode.defaultValue, varType);
        } else if ((0, _definition.isNonNullType)(varType)) {
          const varTypeStr = (0, _inspect.inspect)(varType);
          onError(new _GraphQLError.GraphQLError(`Variable "$${varName}" of required type "${varTypeStr}" was not provided.`, {
            nodes: varDefNode
          }));
        }
        continue;
      }
      const value = inputs[varName];
      if (value === null && (0, _definition.isNonNullType)(varType)) {
        const varTypeStr = (0, _inspect.inspect)(varType);
        onError(new _GraphQLError.GraphQLError(`Variable "$${varName}" of non-null type "${varTypeStr}" must not be null.`, {
          nodes: varDefNode
        }));
        continue;
      }
      coercedValues[varName] = (0, _coerceInputValue.coerceInputValue)(value, varType, (path, invalidValue, error) => {
        let prefix = `Variable "$${varName}" got invalid value ` + (0, _inspect.inspect)(invalidValue);
        if (path.length > 0) {
          prefix += ` at "${varName}${(0, _printPathArray.printPathArray)(path)}"`;
        }
        onError(new _GraphQLError.GraphQLError(prefix + "; " + error.message, {
          nodes: varDefNode,
          originalError: error
        }));
      });
    }
    return coercedValues;
  }
  function getArgumentValues(def, node, variableValues) {
    var _node$arguments;
    const coercedValues = {};
    const argumentNodes = (_node$arguments = node.arguments) !== null && _node$arguments !== undefined ? _node$arguments : [];
    const argNodeMap = (0, _keyMap.keyMap)(argumentNodes, (arg) => arg.name.value);
    for (const argDef of def.args) {
      const name = argDef.name;
      const argType = argDef.type;
      const argumentNode = argNodeMap[name];
      if (!argumentNode) {
        if (argDef.defaultValue !== undefined) {
          coercedValues[name] = argDef.defaultValue;
        } else if ((0, _definition.isNonNullType)(argType)) {
          throw new _GraphQLError.GraphQLError(`Argument "${name}" of required type "${(0, _inspect.inspect)(argType)}" ` + "was not provided.", {
            nodes: node
          });
        }
        continue;
      }
      const valueNode = argumentNode.value;
      let isNull = valueNode.kind === _kinds.Kind.NULL;
      if (valueNode.kind === _kinds.Kind.VARIABLE) {
        const variableName = valueNode.name.value;
        if (variableValues == null || !hasOwnProperty(variableValues, variableName)) {
          if (argDef.defaultValue !== undefined) {
            coercedValues[name] = argDef.defaultValue;
          } else if ((0, _definition.isNonNullType)(argType)) {
            throw new _GraphQLError.GraphQLError(`Argument "${name}" of required type "${(0, _inspect.inspect)(argType)}" ` + `was provided the variable "$${variableName}" which was not provided a runtime value.`, {
              nodes: valueNode
            });
          }
          continue;
        }
        isNull = variableValues[variableName] == null;
      }
      if (isNull && (0, _definition.isNonNullType)(argType)) {
        throw new _GraphQLError.GraphQLError(`Argument "${name}" of non-null type "${(0, _inspect.inspect)(argType)}" ` + "must not be null.", {
          nodes: valueNode
        });
      }
      const coercedValue = (0, _valueFromAST.valueFromAST)(valueNode, argType, variableValues);
      if (coercedValue === undefined) {
        throw new _GraphQLError.GraphQLError(`Argument "${name}" has invalid value ${(0, _printer.print)(valueNode)}.`, {
          nodes: valueNode
        });
      }
      coercedValues[name] = coercedValue;
    }
    return coercedValues;
  }
  function getDirectiveValues(directiveDef, node, variableValues) {
    var _node$directives;
    const directiveNode = (_node$directives = node.directives) === null || _node$directives === undefined ? undefined : _node$directives.find((directive) => directive.name.value === directiveDef.name);
    if (directiveNode) {
      return getArgumentValues(directiveDef, directiveNode, variableValues);
    }
  }
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
});

// node_modules/graphql/execution/collectFields.js
var require_collectFields = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.collectFields = collectFields;
  exports.collectSubfields = collectSubfields;
  var _kinds = require_kinds();
  var _definition = require_definition();
  var _directives = require_directives();
  var _typeFromAST = require_typeFromAST();
  var _values = require_values();
  function collectFields(schema, fragments, variableValues, runtimeType, selectionSet) {
    const fields = new Map;
    collectFieldsImpl(schema, fragments, variableValues, runtimeType, selectionSet, fields, new Set);
    return fields;
  }
  function collectSubfields(schema, fragments, variableValues, returnType, fieldNodes) {
    const subFieldNodes = new Map;
    const visitedFragmentNames = new Set;
    for (const node of fieldNodes) {
      if (node.selectionSet) {
        collectFieldsImpl(schema, fragments, variableValues, returnType, node.selectionSet, subFieldNodes, visitedFragmentNames);
      }
    }
    return subFieldNodes;
  }
  function collectFieldsImpl(schema, fragments, variableValues, runtimeType, selectionSet, fields, visitedFragmentNames) {
    for (const selection of selectionSet.selections) {
      switch (selection.kind) {
        case _kinds.Kind.FIELD: {
          if (!shouldIncludeNode(variableValues, selection)) {
            continue;
          }
          const name = getFieldEntryKey(selection);
          const fieldList = fields.get(name);
          if (fieldList !== undefined) {
            fieldList.push(selection);
          } else {
            fields.set(name, [selection]);
          }
          break;
        }
        case _kinds.Kind.INLINE_FRAGMENT: {
          if (!shouldIncludeNode(variableValues, selection) || !doesFragmentConditionMatch(schema, selection, runtimeType)) {
            continue;
          }
          collectFieldsImpl(schema, fragments, variableValues, runtimeType, selection.selectionSet, fields, visitedFragmentNames);
          break;
        }
        case _kinds.Kind.FRAGMENT_SPREAD: {
          const fragName = selection.name.value;
          if (visitedFragmentNames.has(fragName) || !shouldIncludeNode(variableValues, selection)) {
            continue;
          }
          visitedFragmentNames.add(fragName);
          const fragment = fragments[fragName];
          if (!fragment || !doesFragmentConditionMatch(schema, fragment, runtimeType)) {
            continue;
          }
          collectFieldsImpl(schema, fragments, variableValues, runtimeType, fragment.selectionSet, fields, visitedFragmentNames);
          break;
        }
      }
    }
  }
  function shouldIncludeNode(variableValues, node) {
    const skip = (0, _values.getDirectiveValues)(_directives.GraphQLSkipDirective, node, variableValues);
    if ((skip === null || skip === undefined ? undefined : skip.if) === true) {
      return false;
    }
    const include = (0, _values.getDirectiveValues)(_directives.GraphQLIncludeDirective, node, variableValues);
    if ((include === null || include === undefined ? undefined : include.if) === false) {
      return false;
    }
    return true;
  }
  function doesFragmentConditionMatch(schema, fragment, type) {
    const typeConditionNode = fragment.typeCondition;
    if (!typeConditionNode) {
      return true;
    }
    const conditionalType = (0, _typeFromAST.typeFromAST)(schema, typeConditionNode);
    if (conditionalType === type) {
      return true;
    }
    if ((0, _definition.isAbstractType)(conditionalType)) {
      return schema.isSubType(conditionalType, type);
    }
    return false;
  }
  function getFieldEntryKey(node) {
    return node.alias ? node.alias.value : node.name.value;
  }
});

// node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.js
var require_SingleFieldSubscriptionsRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SingleFieldSubscriptionsRule = SingleFieldSubscriptionsRule;
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _collectFields = require_collectFields();
  function SingleFieldSubscriptionsRule(context) {
    return {
      OperationDefinition(node) {
        if (node.operation === "subscription") {
          const schema = context.getSchema();
          const subscriptionType = schema.getSubscriptionType();
          if (subscriptionType) {
            const operationName = node.name ? node.name.value : null;
            const variableValues = Object.create(null);
            const document = context.getDocument();
            const fragments = Object.create(null);
            for (const definition of document.definitions) {
              if (definition.kind === _kinds.Kind.FRAGMENT_DEFINITION) {
                fragments[definition.name.value] = definition;
              }
            }
            const fields = (0, _collectFields.collectFields)(schema, fragments, variableValues, subscriptionType, node.selectionSet);
            if (fields.size > 1) {
              const fieldSelectionLists = [...fields.values()];
              const extraFieldSelectionLists = fieldSelectionLists.slice(1);
              const extraFieldSelections = extraFieldSelectionLists.flat();
              context.reportError(new _GraphQLError.GraphQLError(operationName != null ? `Subscription "${operationName}" must select only one top level field.` : "Anonymous Subscription must select only one top level field.", {
                nodes: extraFieldSelections
              }));
            }
            for (const fieldNodes of fields.values()) {
              const field = fieldNodes[0];
              const fieldName = field.name.value;
              if (fieldName.startsWith("__")) {
                context.reportError(new _GraphQLError.GraphQLError(operationName != null ? `Subscription "${operationName}" must not select an introspection top level field.` : "Anonymous Subscription must not select an introspection top level field.", {
                  nodes: fieldNodes
                }));
              }
            }
          }
        }
      }
    };
  }
});

// node_modules/graphql/jsutils/groupBy.js
var require_groupBy = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.groupBy = groupBy;
  function groupBy(list, keyFn) {
    const result = new Map;
    for (const item of list) {
      const key = keyFn(item);
      const group = result.get(key);
      if (group === undefined) {
        result.set(key, [item]);
      } else {
        group.push(item);
      }
    }
    return result;
  }
});

// node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.js
var require_UniqueArgumentDefinitionNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueArgumentDefinitionNamesRule = UniqueArgumentDefinitionNamesRule;
  var _groupBy = require_groupBy();
  var _GraphQLError = require_GraphQLError();
  function UniqueArgumentDefinitionNamesRule(context) {
    return {
      DirectiveDefinition(directiveNode) {
        var _directiveNode$argume;
        const argumentNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== undefined ? _directiveNode$argume : [];
        return checkArgUniqueness(`@${directiveNode.name.value}`, argumentNodes);
      },
      InterfaceTypeDefinition: checkArgUniquenessPerField,
      InterfaceTypeExtension: checkArgUniquenessPerField,
      ObjectTypeDefinition: checkArgUniquenessPerField,
      ObjectTypeExtension: checkArgUniquenessPerField
    };
    function checkArgUniquenessPerField(typeNode) {
      var _typeNode$fields;
      const typeName = typeNode.name.value;
      const fieldNodes = (_typeNode$fields = typeNode.fields) !== null && _typeNode$fields !== undefined ? _typeNode$fields : [];
      for (const fieldDef of fieldNodes) {
        var _fieldDef$arguments;
        const fieldName = fieldDef.name.value;
        const argumentNodes = (_fieldDef$arguments = fieldDef.arguments) !== null && _fieldDef$arguments !== undefined ? _fieldDef$arguments : [];
        checkArgUniqueness(`${typeName}.${fieldName}`, argumentNodes);
      }
      return false;
    }
    function checkArgUniqueness(parentName, argumentNodes) {
      const seenArgs = (0, _groupBy.groupBy)(argumentNodes, (arg) => arg.name.value);
      for (const [argName, argNodes] of seenArgs) {
        if (argNodes.length > 1) {
          context.reportError(new _GraphQLError.GraphQLError(`Argument "${parentName}(${argName}:)" can only be defined once.`, {
            nodes: argNodes.map((node) => node.name)
          }));
        }
      }
      return false;
    }
  }
});

// node_modules/graphql/validation/rules/UniqueArgumentNamesRule.js
var require_UniqueArgumentNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueArgumentNamesRule = UniqueArgumentNamesRule;
  var _groupBy = require_groupBy();
  var _GraphQLError = require_GraphQLError();
  function UniqueArgumentNamesRule(context) {
    return {
      Field: checkArgUniqueness,
      Directive: checkArgUniqueness
    };
    function checkArgUniqueness(parentNode) {
      var _parentNode$arguments;
      const argumentNodes = (_parentNode$arguments = parentNode.arguments) !== null && _parentNode$arguments !== undefined ? _parentNode$arguments : [];
      const seenArgs = (0, _groupBy.groupBy)(argumentNodes, (arg) => arg.name.value);
      for (const [argName, argNodes] of seenArgs) {
        if (argNodes.length > 1) {
          context.reportError(new _GraphQLError.GraphQLError(`There can be only one argument named "${argName}".`, {
            nodes: argNodes.map((node) => node.name)
          }));
        }
      }
    }
  }
});

// node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.js
var require_UniqueDirectiveNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueDirectiveNamesRule = UniqueDirectiveNamesRule;
  var _GraphQLError = require_GraphQLError();
  function UniqueDirectiveNamesRule(context) {
    const knownDirectiveNames = Object.create(null);
    const schema = context.getSchema();
    return {
      DirectiveDefinition(node) {
        const directiveName = node.name.value;
        if (schema !== null && schema !== undefined && schema.getDirective(directiveName)) {
          context.reportError(new _GraphQLError.GraphQLError(`Directive "@${directiveName}" already exists in the schema. It cannot be redefined.`, {
            nodes: node.name
          }));
          return;
        }
        if (knownDirectiveNames[directiveName]) {
          context.reportError(new _GraphQLError.GraphQLError(`There can be only one directive named "@${directiveName}".`, {
            nodes: [knownDirectiveNames[directiveName], node.name]
          }));
        } else {
          knownDirectiveNames[directiveName] = node.name;
        }
        return false;
      }
    };
  }
});

// node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.js
var require_UniqueDirectivesPerLocationRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueDirectivesPerLocationRule = UniqueDirectivesPerLocationRule;
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _predicates = require_predicates();
  var _directives = require_directives();
  function UniqueDirectivesPerLocationRule(context) {
    const uniqueDirectiveMap = Object.create(null);
    const schema = context.getSchema();
    const definedDirectives = schema ? schema.getDirectives() : _directives.specifiedDirectives;
    for (const directive of definedDirectives) {
      uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
    }
    const astDefinitions = context.getDocument().definitions;
    for (const def of astDefinitions) {
      if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
        uniqueDirectiveMap[def.name.value] = !def.repeatable;
      }
    }
    const schemaDirectives = Object.create(null);
    const typeDirectivesMap = Object.create(null);
    return {
      enter(node) {
        if (!("directives" in node) || !node.directives) {
          return;
        }
        let seenDirectives;
        if (node.kind === _kinds.Kind.SCHEMA_DEFINITION || node.kind === _kinds.Kind.SCHEMA_EXTENSION) {
          seenDirectives = schemaDirectives;
        } else if ((0, _predicates.isTypeDefinitionNode)(node) || (0, _predicates.isTypeExtensionNode)(node)) {
          const typeName = node.name.value;
          seenDirectives = typeDirectivesMap[typeName];
          if (seenDirectives === undefined) {
            typeDirectivesMap[typeName] = seenDirectives = Object.create(null);
          }
        } else {
          seenDirectives = Object.create(null);
        }
        for (const directive of node.directives) {
          const directiveName = directive.name.value;
          if (uniqueDirectiveMap[directiveName]) {
            if (seenDirectives[directiveName]) {
              context.reportError(new _GraphQLError.GraphQLError(`The directive "@${directiveName}" can only be used once at this location.`, {
                nodes: [seenDirectives[directiveName], directive]
              }));
            } else {
              seenDirectives[directiveName] = directive;
            }
          }
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.js
var require_UniqueEnumValueNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueEnumValueNamesRule = UniqueEnumValueNamesRule;
  var _GraphQLError = require_GraphQLError();
  var _definition = require_definition();
  function UniqueEnumValueNamesRule(context) {
    const schema = context.getSchema();
    const existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
    const knownValueNames = Object.create(null);
    return {
      EnumTypeDefinition: checkValueUniqueness,
      EnumTypeExtension: checkValueUniqueness
    };
    function checkValueUniqueness(node) {
      var _node$values;
      const typeName = node.name.value;
      if (!knownValueNames[typeName]) {
        knownValueNames[typeName] = Object.create(null);
      }
      const valueNodes = (_node$values = node.values) !== null && _node$values !== undefined ? _node$values : [];
      const valueNames = knownValueNames[typeName];
      for (const valueDef of valueNodes) {
        const valueName = valueDef.name.value;
        const existingType = existingTypeMap[typeName];
        if ((0, _definition.isEnumType)(existingType) && existingType.getValue(valueName)) {
          context.reportError(new _GraphQLError.GraphQLError(`Enum value "${typeName}.${valueName}" already exists in the schema. It cannot also be defined in this type extension.`, {
            nodes: valueDef.name
          }));
        } else if (valueNames[valueName]) {
          context.reportError(new _GraphQLError.GraphQLError(`Enum value "${typeName}.${valueName}" can only be defined once.`, {
            nodes: [valueNames[valueName], valueDef.name]
          }));
        } else {
          valueNames[valueName] = valueDef.name;
        }
      }
      return false;
    }
  }
});

// node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.js
var require_UniqueFieldDefinitionNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueFieldDefinitionNamesRule = UniqueFieldDefinitionNamesRule;
  var _GraphQLError = require_GraphQLError();
  var _definition = require_definition();
  function UniqueFieldDefinitionNamesRule(context) {
    const schema = context.getSchema();
    const existingTypeMap = schema ? schema.getTypeMap() : Object.create(null);
    const knownFieldNames = Object.create(null);
    return {
      InputObjectTypeDefinition: checkFieldUniqueness,
      InputObjectTypeExtension: checkFieldUniqueness,
      InterfaceTypeDefinition: checkFieldUniqueness,
      InterfaceTypeExtension: checkFieldUniqueness,
      ObjectTypeDefinition: checkFieldUniqueness,
      ObjectTypeExtension: checkFieldUniqueness
    };
    function checkFieldUniqueness(node) {
      var _node$fields;
      const typeName = node.name.value;
      if (!knownFieldNames[typeName]) {
        knownFieldNames[typeName] = Object.create(null);
      }
      const fieldNodes = (_node$fields = node.fields) !== null && _node$fields !== undefined ? _node$fields : [];
      const fieldNames = knownFieldNames[typeName];
      for (const fieldDef of fieldNodes) {
        const fieldName = fieldDef.name.value;
        if (hasField(existingTypeMap[typeName], fieldName)) {
          context.reportError(new _GraphQLError.GraphQLError(`Field "${typeName}.${fieldName}" already exists in the schema. It cannot also be defined in this type extension.`, {
            nodes: fieldDef.name
          }));
        } else if (fieldNames[fieldName]) {
          context.reportError(new _GraphQLError.GraphQLError(`Field "${typeName}.${fieldName}" can only be defined once.`, {
            nodes: [fieldNames[fieldName], fieldDef.name]
          }));
        } else {
          fieldNames[fieldName] = fieldDef.name;
        }
      }
      return false;
    }
  }
  function hasField(type, fieldName) {
    if ((0, _definition.isObjectType)(type) || (0, _definition.isInterfaceType)(type) || (0, _definition.isInputObjectType)(type)) {
      return type.getFields()[fieldName] != null;
    }
    return false;
  }
});

// node_modules/graphql/validation/rules/UniqueFragmentNamesRule.js
var require_UniqueFragmentNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueFragmentNamesRule = UniqueFragmentNamesRule;
  var _GraphQLError = require_GraphQLError();
  function UniqueFragmentNamesRule(context) {
    const knownFragmentNames = Object.create(null);
    return {
      OperationDefinition: () => false,
      FragmentDefinition(node) {
        const fragmentName = node.name.value;
        if (knownFragmentNames[fragmentName]) {
          context.reportError(new _GraphQLError.GraphQLError(`There can be only one fragment named "${fragmentName}".`, {
            nodes: [knownFragmentNames[fragmentName], node.name]
          }));
        } else {
          knownFragmentNames[fragmentName] = node.name;
        }
        return false;
      }
    };
  }
});

// node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.js
var require_UniqueInputFieldNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueInputFieldNamesRule = UniqueInputFieldNamesRule;
  var _invariant = require_invariant();
  var _GraphQLError = require_GraphQLError();
  function UniqueInputFieldNamesRule(context) {
    const knownNameStack = [];
    let knownNames = Object.create(null);
    return {
      ObjectValue: {
        enter() {
          knownNameStack.push(knownNames);
          knownNames = Object.create(null);
        },
        leave() {
          const prevKnownNames = knownNameStack.pop();
          prevKnownNames || (0, _invariant.invariant)(false);
          knownNames = prevKnownNames;
        }
      },
      ObjectField(node) {
        const fieldName = node.name.value;
        if (knownNames[fieldName]) {
          context.reportError(new _GraphQLError.GraphQLError(`There can be only one input field named "${fieldName}".`, {
            nodes: [knownNames[fieldName], node.name]
          }));
        } else {
          knownNames[fieldName] = node.name;
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/UniqueOperationNamesRule.js
var require_UniqueOperationNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueOperationNamesRule = UniqueOperationNamesRule;
  var _GraphQLError = require_GraphQLError();
  function UniqueOperationNamesRule(context) {
    const knownOperationNames = Object.create(null);
    return {
      OperationDefinition(node) {
        const operationName = node.name;
        if (operationName) {
          if (knownOperationNames[operationName.value]) {
            context.reportError(new _GraphQLError.GraphQLError(`There can be only one operation named "${operationName.value}".`, {
              nodes: [
                knownOperationNames[operationName.value],
                operationName
              ]
            }));
          } else {
            knownOperationNames[operationName.value] = operationName;
          }
        }
        return false;
      },
      FragmentDefinition: () => false
    };
  }
});

// node_modules/graphql/validation/rules/UniqueOperationTypesRule.js
var require_UniqueOperationTypesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueOperationTypesRule = UniqueOperationTypesRule;
  var _GraphQLError = require_GraphQLError();
  function UniqueOperationTypesRule(context) {
    const schema = context.getSchema();
    const definedOperationTypes = Object.create(null);
    const existingOperationTypes = schema ? {
      query: schema.getQueryType(),
      mutation: schema.getMutationType(),
      subscription: schema.getSubscriptionType()
    } : {};
    return {
      SchemaDefinition: checkOperationTypes,
      SchemaExtension: checkOperationTypes
    };
    function checkOperationTypes(node) {
      var _node$operationTypes;
      const operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== undefined ? _node$operationTypes : [];
      for (const operationType of operationTypesNodes) {
        const operation = operationType.operation;
        const alreadyDefinedOperationType = definedOperationTypes[operation];
        if (existingOperationTypes[operation]) {
          context.reportError(new _GraphQLError.GraphQLError(`Type for ${operation} already defined in the schema. It cannot be redefined.`, {
            nodes: operationType
          }));
        } else if (alreadyDefinedOperationType) {
          context.reportError(new _GraphQLError.GraphQLError(`There can be only one ${operation} type in schema.`, {
            nodes: [alreadyDefinedOperationType, operationType]
          }));
        } else {
          definedOperationTypes[operation] = operationType;
        }
      }
      return false;
    }
  }
});

// node_modules/graphql/validation/rules/UniqueTypeNamesRule.js
var require_UniqueTypeNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueTypeNamesRule = UniqueTypeNamesRule;
  var _GraphQLError = require_GraphQLError();
  function UniqueTypeNamesRule(context) {
    const knownTypeNames = Object.create(null);
    const schema = context.getSchema();
    return {
      ScalarTypeDefinition: checkTypeName,
      ObjectTypeDefinition: checkTypeName,
      InterfaceTypeDefinition: checkTypeName,
      UnionTypeDefinition: checkTypeName,
      EnumTypeDefinition: checkTypeName,
      InputObjectTypeDefinition: checkTypeName
    };
    function checkTypeName(node) {
      const typeName = node.name.value;
      if (schema !== null && schema !== undefined && schema.getType(typeName)) {
        context.reportError(new _GraphQLError.GraphQLError(`Type "${typeName}" already exists in the schema. It cannot also be defined in this type definition.`, {
          nodes: node.name
        }));
        return;
      }
      if (knownTypeNames[typeName]) {
        context.reportError(new _GraphQLError.GraphQLError(`There can be only one type named "${typeName}".`, {
          nodes: [knownTypeNames[typeName], node.name]
        }));
      } else {
        knownTypeNames[typeName] = node.name;
      }
      return false;
    }
  }
});

// node_modules/graphql/validation/rules/UniqueVariableNamesRule.js
var require_UniqueVariableNamesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UniqueVariableNamesRule = UniqueVariableNamesRule;
  var _groupBy = require_groupBy();
  var _GraphQLError = require_GraphQLError();
  function UniqueVariableNamesRule(context) {
    return {
      OperationDefinition(operationNode) {
        var _operationNode$variab;
        const variableDefinitions = (_operationNode$variab = operationNode.variableDefinitions) !== null && _operationNode$variab !== undefined ? _operationNode$variab : [];
        const seenVariableDefinitions = (0, _groupBy.groupBy)(variableDefinitions, (node) => node.variable.name.value);
        for (const [variableName, variableNodes] of seenVariableDefinitions) {
          if (variableNodes.length > 1) {
            context.reportError(new _GraphQLError.GraphQLError(`There can be only one variable named "$${variableName}".`, {
              nodes: variableNodes.map((node) => node.variable.name)
            }));
          }
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.js
var require_ValuesOfCorrectTypeRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ValuesOfCorrectTypeRule = ValuesOfCorrectTypeRule;
  var _didYouMean = require_didYouMean();
  var _inspect = require_inspect();
  var _keyMap = require_keyMap();
  var _suggestionList = require_suggestionList();
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _printer = require_printer();
  var _definition = require_definition();
  function ValuesOfCorrectTypeRule(context) {
    let variableDefinitions = {};
    return {
      OperationDefinition: {
        enter() {
          variableDefinitions = {};
        }
      },
      VariableDefinition(definition) {
        variableDefinitions[definition.variable.name.value] = definition;
      },
      ListValue(node) {
        const type = (0, _definition.getNullableType)(context.getParentInputType());
        if (!(0, _definition.isListType)(type)) {
          isValidValueNode(context, node);
          return false;
        }
      },
      ObjectValue(node) {
        const type = (0, _definition.getNamedType)(context.getInputType());
        if (!(0, _definition.isInputObjectType)(type)) {
          isValidValueNode(context, node);
          return false;
        }
        const fieldNodeMap = (0, _keyMap.keyMap)(node.fields, (field) => field.name.value);
        for (const fieldDef of Object.values(type.getFields())) {
          const fieldNode = fieldNodeMap[fieldDef.name];
          if (!fieldNode && (0, _definition.isRequiredInputField)(fieldDef)) {
            const typeStr = (0, _inspect.inspect)(fieldDef.type);
            context.reportError(new _GraphQLError.GraphQLError(`Field "${type.name}.${fieldDef.name}" of required type "${typeStr}" was not provided.`, {
              nodes: node
            }));
          }
        }
        if (type.isOneOf) {
          validateOneOfInputObject(context, node, type, fieldNodeMap, variableDefinitions);
        }
      },
      ObjectField(node) {
        const parentType = (0, _definition.getNamedType)(context.getParentInputType());
        const fieldType = context.getInputType();
        if (!fieldType && (0, _definition.isInputObjectType)(parentType)) {
          const suggestions = (0, _suggestionList.suggestionList)(node.name.value, Object.keys(parentType.getFields()));
          context.reportError(new _GraphQLError.GraphQLError(`Field "${node.name.value}" is not defined by type "${parentType.name}".` + (0, _didYouMean.didYouMean)(suggestions), {
            nodes: node
          }));
        }
      },
      NullValue(node) {
        const type = context.getInputType();
        if ((0, _definition.isNonNullType)(type)) {
          context.reportError(new _GraphQLError.GraphQLError(`Expected value of type "${(0, _inspect.inspect)(type)}", found ${(0, _printer.print)(node)}.`, {
            nodes: node
          }));
        }
      },
      EnumValue: (node) => isValidValueNode(context, node),
      IntValue: (node) => isValidValueNode(context, node),
      FloatValue: (node) => isValidValueNode(context, node),
      StringValue: (node) => isValidValueNode(context, node),
      BooleanValue: (node) => isValidValueNode(context, node)
    };
  }
  function isValidValueNode(context, node) {
    const locationType = context.getInputType();
    if (!locationType) {
      return;
    }
    const type = (0, _definition.getNamedType)(locationType);
    if (!(0, _definition.isLeafType)(type)) {
      const typeStr = (0, _inspect.inspect)(locationType);
      context.reportError(new _GraphQLError.GraphQLError(`Expected value of type "${typeStr}", found ${(0, _printer.print)(node)}.`, {
        nodes: node
      }));
      return;
    }
    try {
      const parseResult = type.parseLiteral(node, undefined);
      if (parseResult === undefined) {
        const typeStr = (0, _inspect.inspect)(locationType);
        context.reportError(new _GraphQLError.GraphQLError(`Expected value of type "${typeStr}", found ${(0, _printer.print)(node)}.`, {
          nodes: node
        }));
      }
    } catch (error) {
      const typeStr = (0, _inspect.inspect)(locationType);
      if (error instanceof _GraphQLError.GraphQLError) {
        context.reportError(error);
      } else {
        context.reportError(new _GraphQLError.GraphQLError(`Expected value of type "${typeStr}", found ${(0, _printer.print)(node)}; ` + error.message, {
          nodes: node,
          originalError: error
        }));
      }
    }
  }
  function validateOneOfInputObject(context, node, type, fieldNodeMap, variableDefinitions) {
    var _fieldNodeMap$keys$;
    const keys = Object.keys(fieldNodeMap);
    const isNotExactlyOneField = keys.length !== 1;
    if (isNotExactlyOneField) {
      context.reportError(new _GraphQLError.GraphQLError(`OneOf Input Object "${type.name}" must specify exactly one key.`, {
        nodes: [node]
      }));
      return;
    }
    const value = (_fieldNodeMap$keys$ = fieldNodeMap[keys[0]]) === null || _fieldNodeMap$keys$ === undefined ? undefined : _fieldNodeMap$keys$.value;
    const isNullLiteral = !value || value.kind === _kinds.Kind.NULL;
    const isVariable = (value === null || value === undefined ? undefined : value.kind) === _kinds.Kind.VARIABLE;
    if (isNullLiteral) {
      context.reportError(new _GraphQLError.GraphQLError(`Field "${type.name}.${keys[0]}" must be non-null.`, {
        nodes: [node]
      }));
      return;
    }
    if (isVariable) {
      const variableName = value.name.value;
      const definition = variableDefinitions[variableName];
      const isNullableVariable = definition.type.kind !== _kinds.Kind.NON_NULL_TYPE;
      if (isNullableVariable) {
        context.reportError(new _GraphQLError.GraphQLError(`Variable "${variableName}" must be non-nullable to be used for OneOf Input Object "${type.name}".`, {
          nodes: [node]
        }));
      }
    }
  }
});

// node_modules/graphql/validation/rules/VariablesAreInputTypesRule.js
var require_VariablesAreInputTypesRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VariablesAreInputTypesRule = VariablesAreInputTypesRule;
  var _GraphQLError = require_GraphQLError();
  var _printer = require_printer();
  var _definition = require_definition();
  var _typeFromAST = require_typeFromAST();
  function VariablesAreInputTypesRule(context) {
    return {
      VariableDefinition(node) {
        const type = (0, _typeFromAST.typeFromAST)(context.getSchema(), node.type);
        if (type !== undefined && !(0, _definition.isInputType)(type)) {
          const variableName = node.variable.name.value;
          const typeName = (0, _printer.print)(node.type);
          context.reportError(new _GraphQLError.GraphQLError(`Variable "$${variableName}" cannot be non-input type "${typeName}".`, {
            nodes: node.type
          }));
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.js
var require_VariablesInAllowedPositionRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.VariablesInAllowedPositionRule = VariablesInAllowedPositionRule;
  var _inspect = require_inspect();
  var _GraphQLError = require_GraphQLError();
  var _kinds = require_kinds();
  var _definition = require_definition();
  var _typeComparators = require_typeComparators();
  var _typeFromAST = require_typeFromAST();
  function VariablesInAllowedPositionRule(context) {
    let varDefMap = Object.create(null);
    return {
      OperationDefinition: {
        enter() {
          varDefMap = Object.create(null);
        },
        leave(operation) {
          const usages = context.getRecursiveVariableUsages(operation);
          for (const { node, type, defaultValue, parentType } of usages) {
            const varName = node.name.value;
            const varDef = varDefMap[varName];
            if (varDef && type) {
              const schema = context.getSchema();
              const varType = (0, _typeFromAST.typeFromAST)(schema, varDef.type);
              if (varType && !allowedVariableUsage(schema, varType, varDef.defaultValue, type, defaultValue)) {
                const varTypeStr = (0, _inspect.inspect)(varType);
                const typeStr = (0, _inspect.inspect)(type);
                context.reportError(new _GraphQLError.GraphQLError(`Variable "$${varName}" of type "${varTypeStr}" used in position expecting type "${typeStr}".`, {
                  nodes: [varDef, node]
                }));
              }
              if ((0, _definition.isInputObjectType)(parentType) && parentType.isOneOf && (0, _definition.isNullableType)(varType)) {
                context.reportError(new _GraphQLError.GraphQLError(`Variable "$${varName}" is of type "${varType}" but must be non-nullable to be used for OneOf Input Object "${parentType}".`, {
                  nodes: [varDef, node]
                }));
              }
            }
          }
        }
      },
      VariableDefinition(node) {
        varDefMap[node.variable.name.value] = node;
      }
    };
  }
  function allowedVariableUsage(schema, varType, varDefaultValue, locationType, locationDefaultValue) {
    if ((0, _definition.isNonNullType)(locationType) && !(0, _definition.isNonNullType)(varType)) {
      const hasNonNullVariableDefaultValue = varDefaultValue != null && varDefaultValue.kind !== _kinds.Kind.NULL;
      const hasLocationDefaultValue = locationDefaultValue !== undefined;
      if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
        return false;
      }
      const nullableLocationType = locationType.ofType;
      return (0, _typeComparators.isTypeSubTypeOf)(schema, varType, nullableLocationType);
    }
    return (0, _typeComparators.isTypeSubTypeOf)(schema, varType, locationType);
  }
});

// node_modules/graphql/validation/specifiedRules.js
var require_specifiedRules = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.specifiedSDLRules = exports.specifiedRules = exports.recommendedRules = undefined;
  var _ExecutableDefinitionsRule = require_ExecutableDefinitionsRule();
  var _FieldsOnCorrectTypeRule = require_FieldsOnCorrectTypeRule();
  var _FragmentsOnCompositeTypesRule = require_FragmentsOnCompositeTypesRule();
  var _KnownArgumentNamesRule = require_KnownArgumentNamesRule();
  var _KnownDirectivesRule = require_KnownDirectivesRule();
  var _KnownFragmentNamesRule = require_KnownFragmentNamesRule();
  var _KnownTypeNamesRule = require_KnownTypeNamesRule();
  var _LoneAnonymousOperationRule = require_LoneAnonymousOperationRule();
  var _LoneSchemaDefinitionRule = require_LoneSchemaDefinitionRule();
  var _MaxIntrospectionDepthRule = require_MaxIntrospectionDepthRule();
  var _NoFragmentCyclesRule = require_NoFragmentCyclesRule();
  var _NoUndefinedVariablesRule = require_NoUndefinedVariablesRule();
  var _NoUnusedFragmentsRule = require_NoUnusedFragmentsRule();
  var _NoUnusedVariablesRule = require_NoUnusedVariablesRule();
  var _OverlappingFieldsCanBeMergedRule = require_OverlappingFieldsCanBeMergedRule();
  var _PossibleFragmentSpreadsRule = require_PossibleFragmentSpreadsRule();
  var _PossibleTypeExtensionsRule = require_PossibleTypeExtensionsRule();
  var _ProvidedRequiredArgumentsRule = require_ProvidedRequiredArgumentsRule();
  var _ScalarLeafsRule = require_ScalarLeafsRule();
  var _SingleFieldSubscriptionsRule = require_SingleFieldSubscriptionsRule();
  var _UniqueArgumentDefinitionNamesRule = require_UniqueArgumentDefinitionNamesRule();
  var _UniqueArgumentNamesRule = require_UniqueArgumentNamesRule();
  var _UniqueDirectiveNamesRule = require_UniqueDirectiveNamesRule();
  var _UniqueDirectivesPerLocationRule = require_UniqueDirectivesPerLocationRule();
  var _UniqueEnumValueNamesRule = require_UniqueEnumValueNamesRule();
  var _UniqueFieldDefinitionNamesRule = require_UniqueFieldDefinitionNamesRule();
  var _UniqueFragmentNamesRule = require_UniqueFragmentNamesRule();
  var _UniqueInputFieldNamesRule = require_UniqueInputFieldNamesRule();
  var _UniqueOperationNamesRule = require_UniqueOperationNamesRule();
  var _UniqueOperationTypesRule = require_UniqueOperationTypesRule();
  var _UniqueTypeNamesRule = require_UniqueTypeNamesRule();
  var _UniqueVariableNamesRule = require_UniqueVariableNamesRule();
  var _ValuesOfCorrectTypeRule = require_ValuesOfCorrectTypeRule();
  var _VariablesAreInputTypesRule = require_VariablesAreInputTypesRule();
  var _VariablesInAllowedPositionRule = require_VariablesInAllowedPositionRule();
  var recommendedRules = Object.freeze([
    _MaxIntrospectionDepthRule.MaxIntrospectionDepthRule
  ]);
  exports.recommendedRules = recommendedRules;
  var specifiedRules = Object.freeze([
    _ExecutableDefinitionsRule.ExecutableDefinitionsRule,
    _UniqueOperationNamesRule.UniqueOperationNamesRule,
    _LoneAnonymousOperationRule.LoneAnonymousOperationRule,
    _SingleFieldSubscriptionsRule.SingleFieldSubscriptionsRule,
    _KnownTypeNamesRule.KnownTypeNamesRule,
    _FragmentsOnCompositeTypesRule.FragmentsOnCompositeTypesRule,
    _VariablesAreInputTypesRule.VariablesAreInputTypesRule,
    _ScalarLeafsRule.ScalarLeafsRule,
    _FieldsOnCorrectTypeRule.FieldsOnCorrectTypeRule,
    _UniqueFragmentNamesRule.UniqueFragmentNamesRule,
    _KnownFragmentNamesRule.KnownFragmentNamesRule,
    _NoUnusedFragmentsRule.NoUnusedFragmentsRule,
    _PossibleFragmentSpreadsRule.PossibleFragmentSpreadsRule,
    _NoFragmentCyclesRule.NoFragmentCyclesRule,
    _UniqueVariableNamesRule.UniqueVariableNamesRule,
    _NoUndefinedVariablesRule.NoUndefinedVariablesRule,
    _NoUnusedVariablesRule.NoUnusedVariablesRule,
    _KnownDirectivesRule.KnownDirectivesRule,
    _UniqueDirectivesPerLocationRule.UniqueDirectivesPerLocationRule,
    _KnownArgumentNamesRule.KnownArgumentNamesRule,
    _UniqueArgumentNamesRule.UniqueArgumentNamesRule,
    _ValuesOfCorrectTypeRule.ValuesOfCorrectTypeRule,
    _ProvidedRequiredArgumentsRule.ProvidedRequiredArgumentsRule,
    _VariablesInAllowedPositionRule.VariablesInAllowedPositionRule,
    _OverlappingFieldsCanBeMergedRule.OverlappingFieldsCanBeMergedRule,
    _UniqueInputFieldNamesRule.UniqueInputFieldNamesRule,
    ...recommendedRules
  ]);
  exports.specifiedRules = specifiedRules;
  var specifiedSDLRules = Object.freeze([
    _LoneSchemaDefinitionRule.LoneSchemaDefinitionRule,
    _UniqueOperationTypesRule.UniqueOperationTypesRule,
    _UniqueTypeNamesRule.UniqueTypeNamesRule,
    _UniqueEnumValueNamesRule.UniqueEnumValueNamesRule,
    _UniqueFieldDefinitionNamesRule.UniqueFieldDefinitionNamesRule,
    _UniqueArgumentDefinitionNamesRule.UniqueArgumentDefinitionNamesRule,
    _UniqueDirectiveNamesRule.UniqueDirectiveNamesRule,
    _KnownTypeNamesRule.KnownTypeNamesRule,
    _KnownDirectivesRule.KnownDirectivesRule,
    _UniqueDirectivesPerLocationRule.UniqueDirectivesPerLocationRule,
    _PossibleTypeExtensionsRule.PossibleTypeExtensionsRule,
    _KnownArgumentNamesRule.KnownArgumentNamesOnDirectivesRule,
    _UniqueArgumentNamesRule.UniqueArgumentNamesRule,
    _UniqueInputFieldNamesRule.UniqueInputFieldNamesRule,
    _ProvidedRequiredArgumentsRule.ProvidedRequiredArgumentsOnDirectivesRule
  ]);
  exports.specifiedSDLRules = specifiedSDLRules;
});

// node_modules/graphql/validation/ValidationContext.js
var require_ValidationContext = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ValidationContext = exports.SDLValidationContext = exports.ASTValidationContext = undefined;
  var _kinds = require_kinds();
  var _visitor = require_visitor();
  var _TypeInfo = require_TypeInfo();

  class ASTValidationContext {
    constructor(ast, onError) {
      this._ast = ast;
      this._fragments = undefined;
      this._fragmentSpreads = new Map;
      this._recursivelyReferencedFragments = new Map;
      this._onError = onError;
    }
    get [Symbol.toStringTag]() {
      return "ASTValidationContext";
    }
    reportError(error) {
      this._onError(error);
    }
    getDocument() {
      return this._ast;
    }
    getFragment(name) {
      let fragments;
      if (this._fragments) {
        fragments = this._fragments;
      } else {
        fragments = Object.create(null);
        for (const defNode of this.getDocument().definitions) {
          if (defNode.kind === _kinds.Kind.FRAGMENT_DEFINITION) {
            fragments[defNode.name.value] = defNode;
          }
        }
        this._fragments = fragments;
      }
      return fragments[name];
    }
    getFragmentSpreads(node) {
      let spreads = this._fragmentSpreads.get(node);
      if (!spreads) {
        spreads = [];
        const setsToVisit = [node];
        let set2;
        while (set2 = setsToVisit.pop()) {
          for (const selection of set2.selections) {
            if (selection.kind === _kinds.Kind.FRAGMENT_SPREAD) {
              spreads.push(selection);
            } else if (selection.selectionSet) {
              setsToVisit.push(selection.selectionSet);
            }
          }
        }
        this._fragmentSpreads.set(node, spreads);
      }
      return spreads;
    }
    getRecursivelyReferencedFragments(operation) {
      let fragments = this._recursivelyReferencedFragments.get(operation);
      if (!fragments) {
        fragments = [];
        const collectedNames = Object.create(null);
        const nodesToVisit = [operation.selectionSet];
        let node;
        while (node = nodesToVisit.pop()) {
          for (const spread of this.getFragmentSpreads(node)) {
            const fragName = spread.name.value;
            if (collectedNames[fragName] !== true) {
              collectedNames[fragName] = true;
              const fragment = this.getFragment(fragName);
              if (fragment) {
                fragments.push(fragment);
                nodesToVisit.push(fragment.selectionSet);
              }
            }
          }
        }
        this._recursivelyReferencedFragments.set(operation, fragments);
      }
      return fragments;
    }
  }
  exports.ASTValidationContext = ASTValidationContext;

  class SDLValidationContext extends ASTValidationContext {
    constructor(ast, schema, onError) {
      super(ast, onError);
      this._schema = schema;
    }
    get [Symbol.toStringTag]() {
      return "SDLValidationContext";
    }
    getSchema() {
      return this._schema;
    }
  }
  exports.SDLValidationContext = SDLValidationContext;

  class ValidationContext extends ASTValidationContext {
    constructor(schema, ast, typeInfo, onError) {
      super(ast, onError);
      this._schema = schema;
      this._typeInfo = typeInfo;
      this._variableUsages = new Map;
      this._recursiveVariableUsages = new Map;
    }
    get [Symbol.toStringTag]() {
      return "ValidationContext";
    }
    getSchema() {
      return this._schema;
    }
    getVariableUsages(node) {
      let usages = this._variableUsages.get(node);
      if (!usages) {
        const newUsages = [];
        const typeInfo = new _TypeInfo.TypeInfo(this._schema);
        (0, _visitor.visit)(node, (0, _TypeInfo.visitWithTypeInfo)(typeInfo, {
          VariableDefinition: () => false,
          Variable(variable) {
            newUsages.push({
              node: variable,
              type: typeInfo.getInputType(),
              defaultValue: typeInfo.getDefaultValue(),
              parentType: typeInfo.getParentInputType()
            });
          }
        }));
        usages = newUsages;
        this._variableUsages.set(node, usages);
      }
      return usages;
    }
    getRecursiveVariableUsages(operation) {
      let usages = this._recursiveVariableUsages.get(operation);
      if (!usages) {
        usages = this.getVariableUsages(operation);
        for (const frag of this.getRecursivelyReferencedFragments(operation)) {
          usages = usages.concat(this.getVariableUsages(frag));
        }
        this._recursiveVariableUsages.set(operation, usages);
      }
      return usages;
    }
    getType() {
      return this._typeInfo.getType();
    }
    getParentType() {
      return this._typeInfo.getParentType();
    }
    getInputType() {
      return this._typeInfo.getInputType();
    }
    getParentInputType() {
      return this._typeInfo.getParentInputType();
    }
    getFieldDef() {
      return this._typeInfo.getFieldDef();
    }
    getDirective() {
      return this._typeInfo.getDirective();
    }
    getArgument() {
      return this._typeInfo.getArgument();
    }
    getEnumValue() {
      return this._typeInfo.getEnumValue();
    }
  }
  exports.ValidationContext = ValidationContext;
});

// node_modules/graphql/validation/validate.js
var require_validate2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.assertValidSDL = assertValidSDL;
  exports.assertValidSDLExtension = assertValidSDLExtension;
  exports.validate = validate;
  exports.validateSDL = validateSDL;
  var _devAssert = require_devAssert();
  var _GraphQLError = require_GraphQLError();
  var _visitor = require_visitor();
  var _validate = require_validate();
  var _TypeInfo = require_TypeInfo();
  var _specifiedRules = require_specifiedRules();
  var _ValidationContext = require_ValidationContext();
  function validate(schema, documentAST, rules = _specifiedRules.specifiedRules, options, typeInfo = new _TypeInfo.TypeInfo(schema)) {
    var _options$maxErrors;
    const maxErrors = (_options$maxErrors = options === null || options === undefined ? undefined : options.maxErrors) !== null && _options$maxErrors !== undefined ? _options$maxErrors : 100;
    documentAST || (0, _devAssert.devAssert)(false, "Must provide document.");
    (0, _validate.assertValidSchema)(schema);
    const abortObj = Object.freeze({});
    const errors2 = [];
    const context = new _ValidationContext.ValidationContext(schema, documentAST, typeInfo, (error) => {
      if (errors2.length >= maxErrors) {
        errors2.push(new _GraphQLError.GraphQLError("Too many validation errors, error limit reached. Validation aborted."));
        throw abortObj;
      }
      errors2.push(error);
    });
    const visitor = (0, _visitor.visitInParallel)(rules.map((rule) => rule(context)));
    try {
      (0, _visitor.visit)(documentAST, (0, _TypeInfo.visitWithTypeInfo)(typeInfo, visitor));
    } catch (e) {
      if (e !== abortObj) {
        throw e;
      }
    }
    return errors2;
  }
  function validateSDL(documentAST, schemaToExtend, rules = _specifiedRules.specifiedSDLRules) {
    const errors2 = [];
    const context = new _ValidationContext.SDLValidationContext(documentAST, schemaToExtend, (error) => {
      errors2.push(error);
    });
    const visitors = rules.map((rule) => rule(context));
    (0, _visitor.visit)(documentAST, (0, _visitor.visitInParallel)(visitors));
    return errors2;
  }
  function assertValidSDL(documentAST) {
    const errors2 = validateSDL(documentAST);
    if (errors2.length !== 0) {
      throw new Error(errors2.map((error) => error.message).join(`

`));
    }
  }
  function assertValidSDLExtension(documentAST, schema) {
    const errors2 = validateSDL(documentAST, schema);
    if (errors2.length !== 0) {
      throw new Error(errors2.map((error) => error.message).join(`

`));
    }
  }
});

// node_modules/graphql/jsutils/memoize3.js
var require_memoize3 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.memoize3 = memoize3;
  function memoize3(fn) {
    let cache0;
    return function memoized(a1, a2, a3) {
      if (cache0 === undefined) {
        cache0 = new WeakMap;
      }
      let cache1 = cache0.get(a1);
      if (cache1 === undefined) {
        cache1 = new WeakMap;
        cache0.set(a1, cache1);
      }
      let cache2 = cache1.get(a2);
      if (cache2 === undefined) {
        cache2 = new WeakMap;
        cache1.set(a2, cache2);
      }
      let fnResult = cache2.get(a3);
      if (fnResult === undefined) {
        fnResult = fn(a1, a2, a3);
        cache2.set(a3, fnResult);
      }
      return fnResult;
    };
  }
});

// node_modules/graphql/jsutils/promiseForObject.js
var require_promiseForObject = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.promiseForObject = promiseForObject;
  function promiseForObject(object2) {
    return Promise.all(Object.values(object2)).then((resolvedValues) => {
      const resolvedObject = Object.create(null);
      for (const [i, key] of Object.keys(object2).entries()) {
        resolvedObject[key] = resolvedValues[i];
      }
      return resolvedObject;
    });
  }
});

// node_modules/graphql/jsutils/promiseReduce.js
var require_promiseReduce = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.promiseReduce = promiseReduce;
  var _isPromise = require_isPromise();
  function promiseReduce(values, callbackFn, initialValue) {
    let accumulator = initialValue;
    for (const value of values) {
      accumulator = (0, _isPromise.isPromise)(accumulator) ? accumulator.then((resolved) => callbackFn(resolved, value)) : callbackFn(accumulator, value);
    }
    return accumulator;
  }
});

// node_modules/graphql/jsutils/toError.js
var require_toError = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toError = toError;
  var _inspect = require_inspect();
  function toError(thrownValue) {
    return thrownValue instanceof Error ? thrownValue : new NonErrorThrown(thrownValue);
  }

  class NonErrorThrown extends Error {
    constructor(thrownValue) {
      super("Unexpected error value: " + (0, _inspect.inspect)(thrownValue));
      this.name = "NonErrorThrown";
      this.thrownValue = thrownValue;
    }
  }
});

// node_modules/graphql/error/locatedError.js
var require_locatedError = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.locatedError = locatedError;
  var _toError = require_toError();
  var _GraphQLError = require_GraphQLError();
  function locatedError(rawOriginalError, nodes, path) {
    var _nodes;
    const originalError = (0, _toError.toError)(rawOriginalError);
    if (isLocatedGraphQLError(originalError)) {
      return originalError;
    }
    return new _GraphQLError.GraphQLError(originalError.message, {
      nodes: (_nodes = originalError.nodes) !== null && _nodes !== undefined ? _nodes : nodes,
      source: originalError.source,
      positions: originalError.positions,
      path,
      originalError
    });
  }
  function isLocatedGraphQLError(error) {
    return Array.isArray(error.path);
  }
});

// node_modules/graphql/execution/execute.js
var require_execute = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.assertValidExecutionArguments = assertValidExecutionArguments;
  exports.buildExecutionContext = buildExecutionContext;
  exports.buildResolveInfo = buildResolveInfo;
  exports.defaultTypeResolver = exports.defaultFieldResolver = undefined;
  exports.execute = execute;
  exports.executeSync = executeSync;
  exports.getFieldDef = getFieldDef;
  var _devAssert = require_devAssert();
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _isIterableObject = require_isIterableObject();
  var _isObjectLike = require_isObjectLike();
  var _isPromise = require_isPromise();
  var _memoize = require_memoize3();
  var _Path = require_Path();
  var _promiseForObject = require_promiseForObject();
  var _promiseReduce = require_promiseReduce();
  var _GraphQLError = require_GraphQLError();
  var _locatedError = require_locatedError();
  var _ast = require_ast();
  var _kinds = require_kinds();
  var _definition = require_definition();
  var _introspection = require_introspection();
  var _validate = require_validate();
  var _collectFields = require_collectFields();
  var _values = require_values();
  var collectSubfields = (0, _memoize.memoize3)((exeContext, returnType, fieldNodes) => (0, _collectFields.collectSubfields)(exeContext.schema, exeContext.fragments, exeContext.variableValues, returnType, fieldNodes));
  function execute(args) {
    arguments.length < 2 || (0, _devAssert.devAssert)(false, "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead.");
    const { schema, document, variableValues, rootValue } = args;
    assertValidExecutionArguments(schema, document, variableValues);
    const exeContext = buildExecutionContext(args);
    if (!("schema" in exeContext)) {
      return {
        errors: exeContext
      };
    }
    try {
      const { operation } = exeContext;
      const result = executeOperation(exeContext, operation, rootValue);
      if ((0, _isPromise.isPromise)(result)) {
        return result.then((data) => buildResponse(data, exeContext.errors), (error) => {
          exeContext.errors.push(error);
          return buildResponse(null, exeContext.errors);
        });
      }
      return buildResponse(result, exeContext.errors);
    } catch (error) {
      exeContext.errors.push(error);
      return buildResponse(null, exeContext.errors);
    }
  }
  function executeSync(args) {
    const result = execute(args);
    if ((0, _isPromise.isPromise)(result)) {
      throw new Error("GraphQL execution failed to complete synchronously.");
    }
    return result;
  }
  function buildResponse(data, errors2) {
    return errors2.length === 0 ? {
      data
    } : {
      errors: errors2,
      data
    };
  }
  function assertValidExecutionArguments(schema, document, rawVariableValues) {
    document || (0, _devAssert.devAssert)(false, "Must provide document.");
    (0, _validate.assertValidSchema)(schema);
    rawVariableValues == null || (0, _isObjectLike.isObjectLike)(rawVariableValues) || (0, _devAssert.devAssert)(false, "Variables must be provided as an Object where each property is a variable value. Perhaps look to see if an unparsed JSON string was provided.");
  }
  function buildExecutionContext(args) {
    var _definition$name, _operation$variableDe, _options$maxCoercionE;
    const {
      schema,
      document,
      rootValue,
      contextValue,
      variableValues: rawVariableValues,
      operationName,
      fieldResolver,
      typeResolver,
      subscribeFieldResolver,
      options
    } = args;
    let operation;
    const fragments = Object.create(null);
    for (const definition of document.definitions) {
      switch (definition.kind) {
        case _kinds.Kind.OPERATION_DEFINITION:
          if (operationName == null) {
            if (operation !== undefined) {
              return [
                new _GraphQLError.GraphQLError("Must provide operation name if query contains multiple operations.")
              ];
            }
            operation = definition;
          } else if (((_definition$name = definition.name) === null || _definition$name === undefined ? undefined : _definition$name.value) === operationName) {
            operation = definition;
          }
          break;
        case _kinds.Kind.FRAGMENT_DEFINITION:
          fragments[definition.name.value] = definition;
          break;
        default:
      }
    }
    if (!operation) {
      if (operationName != null) {
        return [
          new _GraphQLError.GraphQLError(`Unknown operation named "${operationName}".`)
        ];
      }
      return [new _GraphQLError.GraphQLError("Must provide an operation.")];
    }
    const variableDefinitions = (_operation$variableDe = operation.variableDefinitions) !== null && _operation$variableDe !== undefined ? _operation$variableDe : [];
    const coercedVariableValues = (0, _values.getVariableValues)(schema, variableDefinitions, rawVariableValues !== null && rawVariableValues !== undefined ? rawVariableValues : {}, {
      maxErrors: (_options$maxCoercionE = options === null || options === undefined ? undefined : options.maxCoercionErrors) !== null && _options$maxCoercionE !== undefined ? _options$maxCoercionE : 50
    });
    if (coercedVariableValues.errors) {
      return coercedVariableValues.errors;
    }
    return {
      schema,
      fragments,
      rootValue,
      contextValue,
      operation,
      variableValues: coercedVariableValues.coerced,
      fieldResolver: fieldResolver !== null && fieldResolver !== undefined ? fieldResolver : defaultFieldResolver,
      typeResolver: typeResolver !== null && typeResolver !== undefined ? typeResolver : defaultTypeResolver,
      subscribeFieldResolver: subscribeFieldResolver !== null && subscribeFieldResolver !== undefined ? subscribeFieldResolver : defaultFieldResolver,
      errors: []
    };
  }
  function executeOperation(exeContext, operation, rootValue) {
    const rootType = exeContext.schema.getRootType(operation.operation);
    if (rootType == null) {
      throw new _GraphQLError.GraphQLError(`Schema is not configured to execute ${operation.operation} operation.`, {
        nodes: operation
      });
    }
    const rootFields = (0, _collectFields.collectFields)(exeContext.schema, exeContext.fragments, exeContext.variableValues, rootType, operation.selectionSet);
    const path = undefined;
    switch (operation.operation) {
      case _ast.OperationTypeNode.QUERY:
        return executeFields(exeContext, rootType, rootValue, path, rootFields);
      case _ast.OperationTypeNode.MUTATION:
        return executeFieldsSerially(exeContext, rootType, rootValue, path, rootFields);
      case _ast.OperationTypeNode.SUBSCRIPTION:
        return executeFields(exeContext, rootType, rootValue, path, rootFields);
    }
  }
  function executeFieldsSerially(exeContext, parentType, sourceValue, path, fields) {
    return (0, _promiseReduce.promiseReduce)(fields.entries(), (results, [responseName, fieldNodes]) => {
      const fieldPath = (0, _Path.addPath)(path, responseName, parentType.name);
      const result = executeField(exeContext, parentType, sourceValue, fieldNodes, fieldPath);
      if (result === undefined) {
        return results;
      }
      if ((0, _isPromise.isPromise)(result)) {
        return result.then((resolvedResult) => {
          results[responseName] = resolvedResult;
          return results;
        });
      }
      results[responseName] = result;
      return results;
    }, Object.create(null));
  }
  function executeFields(exeContext, parentType, sourceValue, path, fields) {
    const results = Object.create(null);
    let containsPromise = false;
    try {
      for (const [responseName, fieldNodes] of fields.entries()) {
        const fieldPath = (0, _Path.addPath)(path, responseName, parentType.name);
        const result = executeField(exeContext, parentType, sourceValue, fieldNodes, fieldPath);
        if (result !== undefined) {
          results[responseName] = result;
          if ((0, _isPromise.isPromise)(result)) {
            containsPromise = true;
          }
        }
      }
    } catch (error) {
      if (containsPromise) {
        return (0, _promiseForObject.promiseForObject)(results).finally(() => {
          throw error;
        });
      }
      throw error;
    }
    if (!containsPromise) {
      return results;
    }
    return (0, _promiseForObject.promiseForObject)(results);
  }
  function executeField(exeContext, parentType, source, fieldNodes, path) {
    var _fieldDef$resolve;
    const fieldDef = getFieldDef(exeContext.schema, parentType, fieldNodes[0]);
    if (!fieldDef) {
      return;
    }
    const returnType = fieldDef.type;
    const resolveFn = (_fieldDef$resolve = fieldDef.resolve) !== null && _fieldDef$resolve !== undefined ? _fieldDef$resolve : exeContext.fieldResolver;
    const info = buildResolveInfo(exeContext, fieldDef, fieldNodes, parentType, path);
    try {
      const args = (0, _values.getArgumentValues)(fieldDef, fieldNodes[0], exeContext.variableValues);
      const contextValue = exeContext.contextValue;
      const result = resolveFn(source, args, contextValue, info);
      let completed;
      if ((0, _isPromise.isPromise)(result)) {
        completed = result.then((resolved) => completeValue(exeContext, returnType, fieldNodes, info, path, resolved));
      } else {
        completed = completeValue(exeContext, returnType, fieldNodes, info, path, result);
      }
      if ((0, _isPromise.isPromise)(completed)) {
        return completed.then(undefined, (rawError) => {
          const error = (0, _locatedError.locatedError)(rawError, fieldNodes, (0, _Path.pathToArray)(path));
          return handleFieldError(error, returnType, exeContext);
        });
      }
      return completed;
    } catch (rawError) {
      const error = (0, _locatedError.locatedError)(rawError, fieldNodes, (0, _Path.pathToArray)(path));
      return handleFieldError(error, returnType, exeContext);
    }
  }
  function buildResolveInfo(exeContext, fieldDef, fieldNodes, parentType, path) {
    return {
      fieldName: fieldDef.name,
      fieldNodes,
      returnType: fieldDef.type,
      parentType,
      path,
      schema: exeContext.schema,
      fragments: exeContext.fragments,
      rootValue: exeContext.rootValue,
      operation: exeContext.operation,
      variableValues: exeContext.variableValues
    };
  }
  function handleFieldError(error, returnType, exeContext) {
    if ((0, _definition.isNonNullType)(returnType)) {
      throw error;
    }
    exeContext.errors.push(error);
    return null;
  }
  function completeValue(exeContext, returnType, fieldNodes, info, path, result) {
    if (result instanceof Error) {
      throw result;
    }
    if ((0, _definition.isNonNullType)(returnType)) {
      const completed = completeValue(exeContext, returnType.ofType, fieldNodes, info, path, result);
      if (completed === null) {
        throw new Error(`Cannot return null for non-nullable field ${info.parentType.name}.${info.fieldName}.`);
      }
      return completed;
    }
    if (result == null) {
      return null;
    }
    if ((0, _definition.isListType)(returnType)) {
      return completeListValue(exeContext, returnType, fieldNodes, info, path, result);
    }
    if ((0, _definition.isLeafType)(returnType)) {
      return completeLeafValue(returnType, result);
    }
    if ((0, _definition.isAbstractType)(returnType)) {
      return completeAbstractValue(exeContext, returnType, fieldNodes, info, path, result);
    }
    if ((0, _definition.isObjectType)(returnType)) {
      return completeObjectValue(exeContext, returnType, fieldNodes, info, path, result);
    }
    (0, _invariant.invariant)(false, "Cannot complete value of unexpected output type: " + (0, _inspect.inspect)(returnType));
  }
  function completeListValue(exeContext, returnType, fieldNodes, info, path, result) {
    if (!(0, _isIterableObject.isIterableObject)(result)) {
      throw new _GraphQLError.GraphQLError(`Expected Iterable, but did not find one for field "${info.parentType.name}.${info.fieldName}".`);
    }
    const itemType = returnType.ofType;
    let containsPromise = false;
    const completedResults = Array.from(result, (item, index) => {
      const itemPath = (0, _Path.addPath)(path, index, undefined);
      try {
        let completedItem;
        if ((0, _isPromise.isPromise)(item)) {
          completedItem = item.then((resolved) => completeValue(exeContext, itemType, fieldNodes, info, itemPath, resolved));
        } else {
          completedItem = completeValue(exeContext, itemType, fieldNodes, info, itemPath, item);
        }
        if ((0, _isPromise.isPromise)(completedItem)) {
          containsPromise = true;
          return completedItem.then(undefined, (rawError) => {
            const error = (0, _locatedError.locatedError)(rawError, fieldNodes, (0, _Path.pathToArray)(itemPath));
            return handleFieldError(error, itemType, exeContext);
          });
        }
        return completedItem;
      } catch (rawError) {
        const error = (0, _locatedError.locatedError)(rawError, fieldNodes, (0, _Path.pathToArray)(itemPath));
        return handleFieldError(error, itemType, exeContext);
      }
    });
    return containsPromise ? Promise.all(completedResults) : completedResults;
  }
  function completeLeafValue(returnType, result) {
    const serializedResult = returnType.serialize(result);
    if (serializedResult == null) {
      throw new Error(`Expected \`${(0, _inspect.inspect)(returnType)}.serialize(${(0, _inspect.inspect)(result)})\` to ` + `return non-nullable value, returned: ${(0, _inspect.inspect)(serializedResult)}`);
    }
    return serializedResult;
  }
  function completeAbstractValue(exeContext, returnType, fieldNodes, info, path, result) {
    var _returnType$resolveTy;
    const resolveTypeFn = (_returnType$resolveTy = returnType.resolveType) !== null && _returnType$resolveTy !== undefined ? _returnType$resolveTy : exeContext.typeResolver;
    const contextValue = exeContext.contextValue;
    const runtimeType = resolveTypeFn(result, contextValue, info, returnType);
    if ((0, _isPromise.isPromise)(runtimeType)) {
      return runtimeType.then((resolvedRuntimeType) => completeObjectValue(exeContext, ensureValidRuntimeType(resolvedRuntimeType, exeContext, returnType, fieldNodes, info, result), fieldNodes, info, path, result));
    }
    return completeObjectValue(exeContext, ensureValidRuntimeType(runtimeType, exeContext, returnType, fieldNodes, info, result), fieldNodes, info, path, result);
  }
  function ensureValidRuntimeType(runtimeTypeName, exeContext, returnType, fieldNodes, info, result) {
    if (runtimeTypeName == null) {
      throw new _GraphQLError.GraphQLError(`Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}". Either the "${returnType.name}" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.`, fieldNodes);
    }
    if ((0, _definition.isObjectType)(runtimeTypeName)) {
      throw new _GraphQLError.GraphQLError("Support for returning GraphQLObjectType from resolveType was removed in graphql-js@16.0.0 please return type name instead.");
    }
    if (typeof runtimeTypeName !== "string") {
      throw new _GraphQLError.GraphQLError(`Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}" with ` + `value ${(0, _inspect.inspect)(result)}, received "${(0, _inspect.inspect)(runtimeTypeName)}".`);
    }
    const runtimeType = exeContext.schema.getType(runtimeTypeName);
    if (runtimeType == null) {
      throw new _GraphQLError.GraphQLError(`Abstract type "${returnType.name}" was resolved to a type "${runtimeTypeName}" that does not exist inside the schema.`, {
        nodes: fieldNodes
      });
    }
    if (!(0, _definition.isObjectType)(runtimeType)) {
      throw new _GraphQLError.GraphQLError(`Abstract type "${returnType.name}" was resolved to a non-object type "${runtimeTypeName}".`, {
        nodes: fieldNodes
      });
    }
    if (!exeContext.schema.isSubType(returnType, runtimeType)) {
      throw new _GraphQLError.GraphQLError(`Runtime Object type "${runtimeType.name}" is not a possible type for "${returnType.name}".`, {
        nodes: fieldNodes
      });
    }
    return runtimeType;
  }
  function completeObjectValue(exeContext, returnType, fieldNodes, info, path, result) {
    const subFieldNodes = collectSubfields(exeContext, returnType, fieldNodes);
    if (returnType.isTypeOf) {
      const isTypeOf = returnType.isTypeOf(result, exeContext.contextValue, info);
      if ((0, _isPromise.isPromise)(isTypeOf)) {
        return isTypeOf.then((resolvedIsTypeOf) => {
          if (!resolvedIsTypeOf) {
            throw invalidReturnTypeError(returnType, result, fieldNodes);
          }
          return executeFields(exeContext, returnType, result, path, subFieldNodes);
        });
      }
      if (!isTypeOf) {
        throw invalidReturnTypeError(returnType, result, fieldNodes);
      }
    }
    return executeFields(exeContext, returnType, result, path, subFieldNodes);
  }
  function invalidReturnTypeError(returnType, result, fieldNodes) {
    return new _GraphQLError.GraphQLError(`Expected value of type "${returnType.name}" but got: ${(0, _inspect.inspect)(result)}.`, {
      nodes: fieldNodes
    });
  }
  var defaultTypeResolver = function(value, contextValue, info, abstractType) {
    if ((0, _isObjectLike.isObjectLike)(value) && typeof value.__typename === "string") {
      return value.__typename;
    }
    const possibleTypes = info.schema.getPossibleTypes(abstractType);
    const promisedIsTypeOfResults = [];
    for (let i = 0;i < possibleTypes.length; i++) {
      const type = possibleTypes[i];
      if (type.isTypeOf) {
        const isTypeOfResult = type.isTypeOf(value, contextValue, info);
        if ((0, _isPromise.isPromise)(isTypeOfResult)) {
          promisedIsTypeOfResults[i] = isTypeOfResult;
        } else if (isTypeOfResult) {
          return type.name;
        }
      }
    }
    if (promisedIsTypeOfResults.length) {
      return Promise.all(promisedIsTypeOfResults).then((isTypeOfResults) => {
        for (let i = 0;i < isTypeOfResults.length; i++) {
          if (isTypeOfResults[i]) {
            return possibleTypes[i].name;
          }
        }
      });
    }
  };
  exports.defaultTypeResolver = defaultTypeResolver;
  var defaultFieldResolver = function(source, args, contextValue, info) {
    if ((0, _isObjectLike.isObjectLike)(source) || typeof source === "function") {
      const property = source[info.fieldName];
      if (typeof property === "function") {
        return source[info.fieldName](args, contextValue, info);
      }
      return property;
    }
  };
  exports.defaultFieldResolver = defaultFieldResolver;
  function getFieldDef(schema, parentType, fieldNode) {
    const fieldName = fieldNode.name.value;
    if (fieldName === _introspection.SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
      return _introspection.SchemaMetaFieldDef;
    } else if (fieldName === _introspection.TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
      return _introspection.TypeMetaFieldDef;
    } else if (fieldName === _introspection.TypeNameMetaFieldDef.name) {
      return _introspection.TypeNameMetaFieldDef;
    }
    return parentType.getFields()[fieldName];
  }
});

// node_modules/graphql/graphql.js
var require_graphql = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.graphql = graphql;
  exports.graphqlSync = graphqlSync;
  var _devAssert = require_devAssert();
  var _isPromise = require_isPromise();
  var _parser = require_parser();
  var _validate = require_validate();
  var _validate2 = require_validate2();
  var _execute = require_execute();
  function graphql(args) {
    return new Promise((resolve) => resolve(graphqlImpl(args)));
  }
  function graphqlSync(args) {
    const result = graphqlImpl(args);
    if ((0, _isPromise.isPromise)(result)) {
      throw new Error("GraphQL execution failed to complete synchronously.");
    }
    return result;
  }
  function graphqlImpl(args) {
    arguments.length < 2 || (0, _devAssert.devAssert)(false, "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead.");
    const {
      schema,
      source,
      rootValue,
      contextValue,
      variableValues,
      operationName,
      fieldResolver,
      typeResolver
    } = args;
    const schemaValidationErrors = (0, _validate.validateSchema)(schema);
    if (schemaValidationErrors.length > 0) {
      return {
        errors: schemaValidationErrors
      };
    }
    let document;
    try {
      document = (0, _parser.parse)(source);
    } catch (syntaxError2) {
      return {
        errors: [syntaxError2]
      };
    }
    const validationErrors = (0, _validate2.validate)(schema, document);
    if (validationErrors.length > 0) {
      return {
        errors: validationErrors
      };
    }
    return (0, _execute.execute)({
      schema,
      document,
      rootValue,
      contextValue,
      variableValues,
      operationName,
      fieldResolver,
      typeResolver
    });
  }
});

// node_modules/graphql/type/index.js
var require_type = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "DEFAULT_DEPRECATION_REASON", {
    enumerable: true,
    get: function() {
      return _directives.DEFAULT_DEPRECATION_REASON;
    }
  });
  Object.defineProperty(exports, "GRAPHQL_MAX_INT", {
    enumerable: true,
    get: function() {
      return _scalars.GRAPHQL_MAX_INT;
    }
  });
  Object.defineProperty(exports, "GRAPHQL_MIN_INT", {
    enumerable: true,
    get: function() {
      return _scalars.GRAPHQL_MIN_INT;
    }
  });
  Object.defineProperty(exports, "GraphQLBoolean", {
    enumerable: true,
    get: function() {
      return _scalars.GraphQLBoolean;
    }
  });
  Object.defineProperty(exports, "GraphQLDeprecatedDirective", {
    enumerable: true,
    get: function() {
      return _directives.GraphQLDeprecatedDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLDirective", {
    enumerable: true,
    get: function() {
      return _directives.GraphQLDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLEnumType", {
    enumerable: true,
    get: function() {
      return _definition.GraphQLEnumType;
    }
  });
  Object.defineProperty(exports, "GraphQLFloat", {
    enumerable: true,
    get: function() {
      return _scalars.GraphQLFloat;
    }
  });
  Object.defineProperty(exports, "GraphQLID", {
    enumerable: true,
    get: function() {
      return _scalars.GraphQLID;
    }
  });
  Object.defineProperty(exports, "GraphQLIncludeDirective", {
    enumerable: true,
    get: function() {
      return _directives.GraphQLIncludeDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLInputObjectType", {
    enumerable: true,
    get: function() {
      return _definition.GraphQLInputObjectType;
    }
  });
  Object.defineProperty(exports, "GraphQLInt", {
    enumerable: true,
    get: function() {
      return _scalars.GraphQLInt;
    }
  });
  Object.defineProperty(exports, "GraphQLInterfaceType", {
    enumerable: true,
    get: function() {
      return _definition.GraphQLInterfaceType;
    }
  });
  Object.defineProperty(exports, "GraphQLList", {
    enumerable: true,
    get: function() {
      return _definition.GraphQLList;
    }
  });
  Object.defineProperty(exports, "GraphQLNonNull", {
    enumerable: true,
    get: function() {
      return _definition.GraphQLNonNull;
    }
  });
  Object.defineProperty(exports, "GraphQLObjectType", {
    enumerable: true,
    get: function() {
      return _definition.GraphQLObjectType;
    }
  });
  Object.defineProperty(exports, "GraphQLOneOfDirective", {
    enumerable: true,
    get: function() {
      return _directives.GraphQLOneOfDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLScalarType", {
    enumerable: true,
    get: function() {
      return _definition.GraphQLScalarType;
    }
  });
  Object.defineProperty(exports, "GraphQLSchema", {
    enumerable: true,
    get: function() {
      return _schema.GraphQLSchema;
    }
  });
  Object.defineProperty(exports, "GraphQLSkipDirective", {
    enumerable: true,
    get: function() {
      return _directives.GraphQLSkipDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLSpecifiedByDirective", {
    enumerable: true,
    get: function() {
      return _directives.GraphQLSpecifiedByDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLString", {
    enumerable: true,
    get: function() {
      return _scalars.GraphQLString;
    }
  });
  Object.defineProperty(exports, "GraphQLUnionType", {
    enumerable: true,
    get: function() {
      return _definition.GraphQLUnionType;
    }
  });
  Object.defineProperty(exports, "SchemaMetaFieldDef", {
    enumerable: true,
    get: function() {
      return _introspection.SchemaMetaFieldDef;
    }
  });
  Object.defineProperty(exports, "TypeKind", {
    enumerable: true,
    get: function() {
      return _introspection.TypeKind;
    }
  });
  Object.defineProperty(exports, "TypeMetaFieldDef", {
    enumerable: true,
    get: function() {
      return _introspection.TypeMetaFieldDef;
    }
  });
  Object.defineProperty(exports, "TypeNameMetaFieldDef", {
    enumerable: true,
    get: function() {
      return _introspection.TypeNameMetaFieldDef;
    }
  });
  Object.defineProperty(exports, "__Directive", {
    enumerable: true,
    get: function() {
      return _introspection.__Directive;
    }
  });
  Object.defineProperty(exports, "__DirectiveLocation", {
    enumerable: true,
    get: function() {
      return _introspection.__DirectiveLocation;
    }
  });
  Object.defineProperty(exports, "__EnumValue", {
    enumerable: true,
    get: function() {
      return _introspection.__EnumValue;
    }
  });
  Object.defineProperty(exports, "__Field", {
    enumerable: true,
    get: function() {
      return _introspection.__Field;
    }
  });
  Object.defineProperty(exports, "__InputValue", {
    enumerable: true,
    get: function() {
      return _introspection.__InputValue;
    }
  });
  Object.defineProperty(exports, "__Schema", {
    enumerable: true,
    get: function() {
      return _introspection.__Schema;
    }
  });
  Object.defineProperty(exports, "__Type", {
    enumerable: true,
    get: function() {
      return _introspection.__Type;
    }
  });
  Object.defineProperty(exports, "__TypeKind", {
    enumerable: true,
    get: function() {
      return _introspection.__TypeKind;
    }
  });
  Object.defineProperty(exports, "assertAbstractType", {
    enumerable: true,
    get: function() {
      return _definition.assertAbstractType;
    }
  });
  Object.defineProperty(exports, "assertCompositeType", {
    enumerable: true,
    get: function() {
      return _definition.assertCompositeType;
    }
  });
  Object.defineProperty(exports, "assertDirective", {
    enumerable: true,
    get: function() {
      return _directives.assertDirective;
    }
  });
  Object.defineProperty(exports, "assertEnumType", {
    enumerable: true,
    get: function() {
      return _definition.assertEnumType;
    }
  });
  Object.defineProperty(exports, "assertEnumValueName", {
    enumerable: true,
    get: function() {
      return _assertName.assertEnumValueName;
    }
  });
  Object.defineProperty(exports, "assertInputObjectType", {
    enumerable: true,
    get: function() {
      return _definition.assertInputObjectType;
    }
  });
  Object.defineProperty(exports, "assertInputType", {
    enumerable: true,
    get: function() {
      return _definition.assertInputType;
    }
  });
  Object.defineProperty(exports, "assertInterfaceType", {
    enumerable: true,
    get: function() {
      return _definition.assertInterfaceType;
    }
  });
  Object.defineProperty(exports, "assertLeafType", {
    enumerable: true,
    get: function() {
      return _definition.assertLeafType;
    }
  });
  Object.defineProperty(exports, "assertListType", {
    enumerable: true,
    get: function() {
      return _definition.assertListType;
    }
  });
  Object.defineProperty(exports, "assertName", {
    enumerable: true,
    get: function() {
      return _assertName.assertName;
    }
  });
  Object.defineProperty(exports, "assertNamedType", {
    enumerable: true,
    get: function() {
      return _definition.assertNamedType;
    }
  });
  Object.defineProperty(exports, "assertNonNullType", {
    enumerable: true,
    get: function() {
      return _definition.assertNonNullType;
    }
  });
  Object.defineProperty(exports, "assertNullableType", {
    enumerable: true,
    get: function() {
      return _definition.assertNullableType;
    }
  });
  Object.defineProperty(exports, "assertObjectType", {
    enumerable: true,
    get: function() {
      return _definition.assertObjectType;
    }
  });
  Object.defineProperty(exports, "assertOutputType", {
    enumerable: true,
    get: function() {
      return _definition.assertOutputType;
    }
  });
  Object.defineProperty(exports, "assertScalarType", {
    enumerable: true,
    get: function() {
      return _definition.assertScalarType;
    }
  });
  Object.defineProperty(exports, "assertSchema", {
    enumerable: true,
    get: function() {
      return _schema.assertSchema;
    }
  });
  Object.defineProperty(exports, "assertType", {
    enumerable: true,
    get: function() {
      return _definition.assertType;
    }
  });
  Object.defineProperty(exports, "assertUnionType", {
    enumerable: true,
    get: function() {
      return _definition.assertUnionType;
    }
  });
  Object.defineProperty(exports, "assertValidSchema", {
    enumerable: true,
    get: function() {
      return _validate.assertValidSchema;
    }
  });
  Object.defineProperty(exports, "assertWrappingType", {
    enumerable: true,
    get: function() {
      return _definition.assertWrappingType;
    }
  });
  Object.defineProperty(exports, "getNamedType", {
    enumerable: true,
    get: function() {
      return _definition.getNamedType;
    }
  });
  Object.defineProperty(exports, "getNullableType", {
    enumerable: true,
    get: function() {
      return _definition.getNullableType;
    }
  });
  Object.defineProperty(exports, "introspectionTypes", {
    enumerable: true,
    get: function() {
      return _introspection.introspectionTypes;
    }
  });
  Object.defineProperty(exports, "isAbstractType", {
    enumerable: true,
    get: function() {
      return _definition.isAbstractType;
    }
  });
  Object.defineProperty(exports, "isCompositeType", {
    enumerable: true,
    get: function() {
      return _definition.isCompositeType;
    }
  });
  Object.defineProperty(exports, "isDirective", {
    enumerable: true,
    get: function() {
      return _directives.isDirective;
    }
  });
  Object.defineProperty(exports, "isEnumType", {
    enumerable: true,
    get: function() {
      return _definition.isEnumType;
    }
  });
  Object.defineProperty(exports, "isInputObjectType", {
    enumerable: true,
    get: function() {
      return _definition.isInputObjectType;
    }
  });
  Object.defineProperty(exports, "isInputType", {
    enumerable: true,
    get: function() {
      return _definition.isInputType;
    }
  });
  Object.defineProperty(exports, "isInterfaceType", {
    enumerable: true,
    get: function() {
      return _definition.isInterfaceType;
    }
  });
  Object.defineProperty(exports, "isIntrospectionType", {
    enumerable: true,
    get: function() {
      return _introspection.isIntrospectionType;
    }
  });
  Object.defineProperty(exports, "isLeafType", {
    enumerable: true,
    get: function() {
      return _definition.isLeafType;
    }
  });
  Object.defineProperty(exports, "isListType", {
    enumerable: true,
    get: function() {
      return _definition.isListType;
    }
  });
  Object.defineProperty(exports, "isNamedType", {
    enumerable: true,
    get: function() {
      return _definition.isNamedType;
    }
  });
  Object.defineProperty(exports, "isNonNullType", {
    enumerable: true,
    get: function() {
      return _definition.isNonNullType;
    }
  });
  Object.defineProperty(exports, "isNullableType", {
    enumerable: true,
    get: function() {
      return _definition.isNullableType;
    }
  });
  Object.defineProperty(exports, "isObjectType", {
    enumerable: true,
    get: function() {
      return _definition.isObjectType;
    }
  });
  Object.defineProperty(exports, "isOutputType", {
    enumerable: true,
    get: function() {
      return _definition.isOutputType;
    }
  });
  Object.defineProperty(exports, "isRequiredArgument", {
    enumerable: true,
    get: function() {
      return _definition.isRequiredArgument;
    }
  });
  Object.defineProperty(exports, "isRequiredInputField", {
    enumerable: true,
    get: function() {
      return _definition.isRequiredInputField;
    }
  });
  Object.defineProperty(exports, "isScalarType", {
    enumerable: true,
    get: function() {
      return _definition.isScalarType;
    }
  });
  Object.defineProperty(exports, "isSchema", {
    enumerable: true,
    get: function() {
      return _schema.isSchema;
    }
  });
  Object.defineProperty(exports, "isSpecifiedDirective", {
    enumerable: true,
    get: function() {
      return _directives.isSpecifiedDirective;
    }
  });
  Object.defineProperty(exports, "isSpecifiedScalarType", {
    enumerable: true,
    get: function() {
      return _scalars.isSpecifiedScalarType;
    }
  });
  Object.defineProperty(exports, "isType", {
    enumerable: true,
    get: function() {
      return _definition.isType;
    }
  });
  Object.defineProperty(exports, "isUnionType", {
    enumerable: true,
    get: function() {
      return _definition.isUnionType;
    }
  });
  Object.defineProperty(exports, "isWrappingType", {
    enumerable: true,
    get: function() {
      return _definition.isWrappingType;
    }
  });
  Object.defineProperty(exports, "resolveObjMapThunk", {
    enumerable: true,
    get: function() {
      return _definition.resolveObjMapThunk;
    }
  });
  Object.defineProperty(exports, "resolveReadonlyArrayThunk", {
    enumerable: true,
    get: function() {
      return _definition.resolveReadonlyArrayThunk;
    }
  });
  Object.defineProperty(exports, "specifiedDirectives", {
    enumerable: true,
    get: function() {
      return _directives.specifiedDirectives;
    }
  });
  Object.defineProperty(exports, "specifiedScalarTypes", {
    enumerable: true,
    get: function() {
      return _scalars.specifiedScalarTypes;
    }
  });
  Object.defineProperty(exports, "validateSchema", {
    enumerable: true,
    get: function() {
      return _validate.validateSchema;
    }
  });
  var _schema = require_schema();
  var _definition = require_definition();
  var _directives = require_directives();
  var _scalars = require_scalars();
  var _introspection = require_introspection();
  var _validate = require_validate();
  var _assertName = require_assertName();
});

// node_modules/graphql/language/index.js
var require_language = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "BREAK", {
    enumerable: true,
    get: function() {
      return _visitor.BREAK;
    }
  });
  Object.defineProperty(exports, "DirectiveLocation", {
    enumerable: true,
    get: function() {
      return _directiveLocation.DirectiveLocation;
    }
  });
  Object.defineProperty(exports, "Kind", {
    enumerable: true,
    get: function() {
      return _kinds.Kind;
    }
  });
  Object.defineProperty(exports, "Lexer", {
    enumerable: true,
    get: function() {
      return _lexer.Lexer;
    }
  });
  Object.defineProperty(exports, "Location", {
    enumerable: true,
    get: function() {
      return _ast.Location;
    }
  });
  Object.defineProperty(exports, "OperationTypeNode", {
    enumerable: true,
    get: function() {
      return _ast.OperationTypeNode;
    }
  });
  Object.defineProperty(exports, "Source", {
    enumerable: true,
    get: function() {
      return _source.Source;
    }
  });
  Object.defineProperty(exports, "Token", {
    enumerable: true,
    get: function() {
      return _ast.Token;
    }
  });
  Object.defineProperty(exports, "TokenKind", {
    enumerable: true,
    get: function() {
      return _tokenKind.TokenKind;
    }
  });
  Object.defineProperty(exports, "getEnterLeaveForKind", {
    enumerable: true,
    get: function() {
      return _visitor.getEnterLeaveForKind;
    }
  });
  Object.defineProperty(exports, "getLocation", {
    enumerable: true,
    get: function() {
      return _location.getLocation;
    }
  });
  Object.defineProperty(exports, "getVisitFn", {
    enumerable: true,
    get: function() {
      return _visitor.getVisitFn;
    }
  });
  Object.defineProperty(exports, "isConstValueNode", {
    enumerable: true,
    get: function() {
      return _predicates.isConstValueNode;
    }
  });
  Object.defineProperty(exports, "isDefinitionNode", {
    enumerable: true,
    get: function() {
      return _predicates.isDefinitionNode;
    }
  });
  Object.defineProperty(exports, "isExecutableDefinitionNode", {
    enumerable: true,
    get: function() {
      return _predicates.isExecutableDefinitionNode;
    }
  });
  Object.defineProperty(exports, "isSelectionNode", {
    enumerable: true,
    get: function() {
      return _predicates.isSelectionNode;
    }
  });
  Object.defineProperty(exports, "isTypeDefinitionNode", {
    enumerable: true,
    get: function() {
      return _predicates.isTypeDefinitionNode;
    }
  });
  Object.defineProperty(exports, "isTypeExtensionNode", {
    enumerable: true,
    get: function() {
      return _predicates.isTypeExtensionNode;
    }
  });
  Object.defineProperty(exports, "isTypeNode", {
    enumerable: true,
    get: function() {
      return _predicates.isTypeNode;
    }
  });
  Object.defineProperty(exports, "isTypeSystemDefinitionNode", {
    enumerable: true,
    get: function() {
      return _predicates.isTypeSystemDefinitionNode;
    }
  });
  Object.defineProperty(exports, "isTypeSystemExtensionNode", {
    enumerable: true,
    get: function() {
      return _predicates.isTypeSystemExtensionNode;
    }
  });
  Object.defineProperty(exports, "isValueNode", {
    enumerable: true,
    get: function() {
      return _predicates.isValueNode;
    }
  });
  Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function() {
      return _parser.parse;
    }
  });
  Object.defineProperty(exports, "parseConstValue", {
    enumerable: true,
    get: function() {
      return _parser.parseConstValue;
    }
  });
  Object.defineProperty(exports, "parseType", {
    enumerable: true,
    get: function() {
      return _parser.parseType;
    }
  });
  Object.defineProperty(exports, "parseValue", {
    enumerable: true,
    get: function() {
      return _parser.parseValue;
    }
  });
  Object.defineProperty(exports, "print", {
    enumerable: true,
    get: function() {
      return _printer.print;
    }
  });
  Object.defineProperty(exports, "printLocation", {
    enumerable: true,
    get: function() {
      return _printLocation.printLocation;
    }
  });
  Object.defineProperty(exports, "printSourceLocation", {
    enumerable: true,
    get: function() {
      return _printLocation.printSourceLocation;
    }
  });
  Object.defineProperty(exports, "visit", {
    enumerable: true,
    get: function() {
      return _visitor.visit;
    }
  });
  Object.defineProperty(exports, "visitInParallel", {
    enumerable: true,
    get: function() {
      return _visitor.visitInParallel;
    }
  });
  var _source = require_source();
  var _location = require_location();
  var _printLocation = require_printLocation();
  var _kinds = require_kinds();
  var _tokenKind = require_tokenKind();
  var _lexer = require_lexer();
  var _parser = require_parser();
  var _printer = require_printer();
  var _visitor = require_visitor();
  var _ast = require_ast();
  var _predicates = require_predicates();
  var _directiveLocation = require_directiveLocation();
});

// node_modules/graphql/jsutils/isAsyncIterable.js
var require_isAsyncIterable = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isAsyncIterable = isAsyncIterable;
  function isAsyncIterable(maybeAsyncIterable) {
    return typeof (maybeAsyncIterable === null || maybeAsyncIterable === undefined ? undefined : maybeAsyncIterable[Symbol.asyncIterator]) === "function";
  }
});

// node_modules/graphql/execution/mapAsyncIterator.js
var require_mapAsyncIterator = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mapAsyncIterator = mapAsyncIterator;
  function mapAsyncIterator(iterable, callback) {
    const iterator = iterable[Symbol.asyncIterator]();
    async function mapResult(result) {
      if (result.done) {
        return result;
      }
      try {
        return {
          value: await callback(result.value),
          done: false
        };
      } catch (error) {
        if (typeof iterator.return === "function") {
          try {
            await iterator.return();
          } catch (_e) {}
        }
        throw error;
      }
    }
    return {
      async next() {
        return mapResult(await iterator.next());
      },
      async return() {
        return typeof iterator.return === "function" ? mapResult(await iterator.return()) : {
          value: undefined,
          done: true
        };
      },
      async throw(error) {
        if (typeof iterator.throw === "function") {
          return mapResult(await iterator.throw(error));
        }
        throw error;
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }
});

// node_modules/graphql/execution/subscribe.js
var require_subscribe = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createSourceEventStream = createSourceEventStream;
  exports.subscribe = subscribe;
  var _devAssert = require_devAssert();
  var _inspect = require_inspect();
  var _isAsyncIterable = require_isAsyncIterable();
  var _Path = require_Path();
  var _GraphQLError = require_GraphQLError();
  var _locatedError = require_locatedError();
  var _collectFields = require_collectFields();
  var _execute = require_execute();
  var _mapAsyncIterator = require_mapAsyncIterator();
  var _values = require_values();
  async function subscribe(args) {
    arguments.length < 2 || (0, _devAssert.devAssert)(false, "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead.");
    const resultOrStream = await createSourceEventStream(args);
    if (!(0, _isAsyncIterable.isAsyncIterable)(resultOrStream)) {
      return resultOrStream;
    }
    const mapSourceToResponse = (payload) => (0, _execute.execute)({ ...args, rootValue: payload });
    return (0, _mapAsyncIterator.mapAsyncIterator)(resultOrStream, mapSourceToResponse);
  }
  function toNormalizedArgs(args) {
    const firstArg = args[0];
    if (firstArg && "document" in firstArg) {
      return firstArg;
    }
    return {
      schema: firstArg,
      document: args[1],
      rootValue: args[2],
      contextValue: args[3],
      variableValues: args[4],
      operationName: args[5],
      subscribeFieldResolver: args[6]
    };
  }
  async function createSourceEventStream(...rawArgs) {
    const args = toNormalizedArgs(rawArgs);
    const { schema, document, variableValues } = args;
    (0, _execute.assertValidExecutionArguments)(schema, document, variableValues);
    const exeContext = (0, _execute.buildExecutionContext)(args);
    if (!("schema" in exeContext)) {
      return {
        errors: exeContext
      };
    }
    try {
      const eventStream = await executeSubscription(exeContext);
      if (!(0, _isAsyncIterable.isAsyncIterable)(eventStream)) {
        throw new Error("Subscription field must return Async Iterable. " + `Received: ${(0, _inspect.inspect)(eventStream)}.`);
      }
      return eventStream;
    } catch (error) {
      if (error instanceof _GraphQLError.GraphQLError) {
        return {
          errors: [error]
        };
      }
      throw error;
    }
  }
  async function executeSubscription(exeContext) {
    const { schema, fragments, operation, variableValues, rootValue } = exeContext;
    const rootType = schema.getSubscriptionType();
    if (rootType == null) {
      throw new _GraphQLError.GraphQLError("Schema is not configured to execute subscription operation.", {
        nodes: operation
      });
    }
    const rootFields = (0, _collectFields.collectFields)(schema, fragments, variableValues, rootType, operation.selectionSet);
    const [responseName, fieldNodes] = [...rootFields.entries()][0];
    const fieldDef = (0, _execute.getFieldDef)(schema, rootType, fieldNodes[0]);
    if (!fieldDef) {
      const fieldName = fieldNodes[0].name.value;
      throw new _GraphQLError.GraphQLError(`The subscription field "${fieldName}" is not defined.`, {
        nodes: fieldNodes
      });
    }
    const path = (0, _Path.addPath)(undefined, responseName, rootType.name);
    const info = (0, _execute.buildResolveInfo)(exeContext, fieldDef, fieldNodes, rootType, path);
    try {
      var _fieldDef$subscribe;
      const args = (0, _values.getArgumentValues)(fieldDef, fieldNodes[0], variableValues);
      const contextValue = exeContext.contextValue;
      const resolveFn = (_fieldDef$subscribe = fieldDef.subscribe) !== null && _fieldDef$subscribe !== undefined ? _fieldDef$subscribe : exeContext.subscribeFieldResolver;
      const eventStream = await resolveFn(rootValue, args, contextValue, info);
      if (eventStream instanceof Error) {
        throw eventStream;
      }
      return eventStream;
    } catch (error) {
      throw (0, _locatedError.locatedError)(error, fieldNodes, (0, _Path.pathToArray)(path));
    }
  }
});

// node_modules/graphql/execution/index.js
var require_execution = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "createSourceEventStream", {
    enumerable: true,
    get: function() {
      return _subscribe.createSourceEventStream;
    }
  });
  Object.defineProperty(exports, "defaultFieldResolver", {
    enumerable: true,
    get: function() {
      return _execute.defaultFieldResolver;
    }
  });
  Object.defineProperty(exports, "defaultTypeResolver", {
    enumerable: true,
    get: function() {
      return _execute.defaultTypeResolver;
    }
  });
  Object.defineProperty(exports, "execute", {
    enumerable: true,
    get: function() {
      return _execute.execute;
    }
  });
  Object.defineProperty(exports, "executeSync", {
    enumerable: true,
    get: function() {
      return _execute.executeSync;
    }
  });
  Object.defineProperty(exports, "getArgumentValues", {
    enumerable: true,
    get: function() {
      return _values.getArgumentValues;
    }
  });
  Object.defineProperty(exports, "getDirectiveValues", {
    enumerable: true,
    get: function() {
      return _values.getDirectiveValues;
    }
  });
  Object.defineProperty(exports, "getVariableValues", {
    enumerable: true,
    get: function() {
      return _values.getVariableValues;
    }
  });
  Object.defineProperty(exports, "responsePathAsArray", {
    enumerable: true,
    get: function() {
      return _Path.pathToArray;
    }
  });
  Object.defineProperty(exports, "subscribe", {
    enumerable: true,
    get: function() {
      return _subscribe.subscribe;
    }
  });
  var _Path = require_Path();
  var _execute = require_execute();
  var _subscribe = require_subscribe();
  var _values = require_values();
});

// node_modules/graphql/validation/rules/custom/NoDeprecatedCustomRule.js
var require_NoDeprecatedCustomRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NoDeprecatedCustomRule = NoDeprecatedCustomRule;
  var _invariant = require_invariant();
  var _GraphQLError = require_GraphQLError();
  var _definition = require_definition();
  function NoDeprecatedCustomRule(context) {
    return {
      Field(node) {
        const fieldDef = context.getFieldDef();
        const deprecationReason = fieldDef === null || fieldDef === undefined ? undefined : fieldDef.deprecationReason;
        if (fieldDef && deprecationReason != null) {
          const parentType = context.getParentType();
          parentType != null || (0, _invariant.invariant)(false);
          context.reportError(new _GraphQLError.GraphQLError(`The field ${parentType.name}.${fieldDef.name} is deprecated. ${deprecationReason}`, {
            nodes: node
          }));
        }
      },
      Argument(node) {
        const argDef = context.getArgument();
        const deprecationReason = argDef === null || argDef === undefined ? undefined : argDef.deprecationReason;
        if (argDef && deprecationReason != null) {
          const directiveDef = context.getDirective();
          if (directiveDef != null) {
            context.reportError(new _GraphQLError.GraphQLError(`Directive "@${directiveDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`, {
              nodes: node
            }));
          } else {
            const parentType = context.getParentType();
            const fieldDef = context.getFieldDef();
            parentType != null && fieldDef != null || (0, _invariant.invariant)(false);
            context.reportError(new _GraphQLError.GraphQLError(`Field "${parentType.name}.${fieldDef.name}" argument "${argDef.name}" is deprecated. ${deprecationReason}`, {
              nodes: node
            }));
          }
        }
      },
      ObjectField(node) {
        const inputObjectDef = (0, _definition.getNamedType)(context.getParentInputType());
        if ((0, _definition.isInputObjectType)(inputObjectDef)) {
          const inputFieldDef = inputObjectDef.getFields()[node.name.value];
          const deprecationReason = inputFieldDef === null || inputFieldDef === undefined ? undefined : inputFieldDef.deprecationReason;
          if (deprecationReason != null) {
            context.reportError(new _GraphQLError.GraphQLError(`The input field ${inputObjectDef.name}.${inputFieldDef.name} is deprecated. ${deprecationReason}`, {
              nodes: node
            }));
          }
        }
      },
      EnumValue(node) {
        const enumValueDef = context.getEnumValue();
        const deprecationReason = enumValueDef === null || enumValueDef === undefined ? undefined : enumValueDef.deprecationReason;
        if (enumValueDef && deprecationReason != null) {
          const enumTypeDef = (0, _definition.getNamedType)(context.getInputType());
          enumTypeDef != null || (0, _invariant.invariant)(false);
          context.reportError(new _GraphQLError.GraphQLError(`The enum value "${enumTypeDef.name}.${enumValueDef.name}" is deprecated. ${deprecationReason}`, {
            nodes: node
          }));
        }
      }
    };
  }
});

// node_modules/graphql/validation/rules/custom/NoSchemaIntrospectionCustomRule.js
var require_NoSchemaIntrospectionCustomRule = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NoSchemaIntrospectionCustomRule = NoSchemaIntrospectionCustomRule;
  var _GraphQLError = require_GraphQLError();
  var _definition = require_definition();
  var _introspection = require_introspection();
  function NoSchemaIntrospectionCustomRule(context) {
    return {
      Field(node) {
        const type = (0, _definition.getNamedType)(context.getType());
        if (type && (0, _introspection.isIntrospectionType)(type)) {
          context.reportError(new _GraphQLError.GraphQLError(`GraphQL introspection has been disabled, but the requested query contained the field "${node.name.value}".`, {
            nodes: node
          }));
        }
      }
    };
  }
});

// node_modules/graphql/validation/index.js
var require_validation = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "ExecutableDefinitionsRule", {
    enumerable: true,
    get: function() {
      return _ExecutableDefinitionsRule.ExecutableDefinitionsRule;
    }
  });
  Object.defineProperty(exports, "FieldsOnCorrectTypeRule", {
    enumerable: true,
    get: function() {
      return _FieldsOnCorrectTypeRule.FieldsOnCorrectTypeRule;
    }
  });
  Object.defineProperty(exports, "FragmentsOnCompositeTypesRule", {
    enumerable: true,
    get: function() {
      return _FragmentsOnCompositeTypesRule.FragmentsOnCompositeTypesRule;
    }
  });
  Object.defineProperty(exports, "KnownArgumentNamesRule", {
    enumerable: true,
    get: function() {
      return _KnownArgumentNamesRule.KnownArgumentNamesRule;
    }
  });
  Object.defineProperty(exports, "KnownDirectivesRule", {
    enumerable: true,
    get: function() {
      return _KnownDirectivesRule.KnownDirectivesRule;
    }
  });
  Object.defineProperty(exports, "KnownFragmentNamesRule", {
    enumerable: true,
    get: function() {
      return _KnownFragmentNamesRule.KnownFragmentNamesRule;
    }
  });
  Object.defineProperty(exports, "KnownTypeNamesRule", {
    enumerable: true,
    get: function() {
      return _KnownTypeNamesRule.KnownTypeNamesRule;
    }
  });
  Object.defineProperty(exports, "LoneAnonymousOperationRule", {
    enumerable: true,
    get: function() {
      return _LoneAnonymousOperationRule.LoneAnonymousOperationRule;
    }
  });
  Object.defineProperty(exports, "LoneSchemaDefinitionRule", {
    enumerable: true,
    get: function() {
      return _LoneSchemaDefinitionRule.LoneSchemaDefinitionRule;
    }
  });
  Object.defineProperty(exports, "MaxIntrospectionDepthRule", {
    enumerable: true,
    get: function() {
      return _MaxIntrospectionDepthRule.MaxIntrospectionDepthRule;
    }
  });
  Object.defineProperty(exports, "NoDeprecatedCustomRule", {
    enumerable: true,
    get: function() {
      return _NoDeprecatedCustomRule.NoDeprecatedCustomRule;
    }
  });
  Object.defineProperty(exports, "NoFragmentCyclesRule", {
    enumerable: true,
    get: function() {
      return _NoFragmentCyclesRule.NoFragmentCyclesRule;
    }
  });
  Object.defineProperty(exports, "NoSchemaIntrospectionCustomRule", {
    enumerable: true,
    get: function() {
      return _NoSchemaIntrospectionCustomRule.NoSchemaIntrospectionCustomRule;
    }
  });
  Object.defineProperty(exports, "NoUndefinedVariablesRule", {
    enumerable: true,
    get: function() {
      return _NoUndefinedVariablesRule.NoUndefinedVariablesRule;
    }
  });
  Object.defineProperty(exports, "NoUnusedFragmentsRule", {
    enumerable: true,
    get: function() {
      return _NoUnusedFragmentsRule.NoUnusedFragmentsRule;
    }
  });
  Object.defineProperty(exports, "NoUnusedVariablesRule", {
    enumerable: true,
    get: function() {
      return _NoUnusedVariablesRule.NoUnusedVariablesRule;
    }
  });
  Object.defineProperty(exports, "OverlappingFieldsCanBeMergedRule", {
    enumerable: true,
    get: function() {
      return _OverlappingFieldsCanBeMergedRule.OverlappingFieldsCanBeMergedRule;
    }
  });
  Object.defineProperty(exports, "PossibleFragmentSpreadsRule", {
    enumerable: true,
    get: function() {
      return _PossibleFragmentSpreadsRule.PossibleFragmentSpreadsRule;
    }
  });
  Object.defineProperty(exports, "PossibleTypeExtensionsRule", {
    enumerable: true,
    get: function() {
      return _PossibleTypeExtensionsRule.PossibleTypeExtensionsRule;
    }
  });
  Object.defineProperty(exports, "ProvidedRequiredArgumentsRule", {
    enumerable: true,
    get: function() {
      return _ProvidedRequiredArgumentsRule.ProvidedRequiredArgumentsRule;
    }
  });
  Object.defineProperty(exports, "ScalarLeafsRule", {
    enumerable: true,
    get: function() {
      return _ScalarLeafsRule.ScalarLeafsRule;
    }
  });
  Object.defineProperty(exports, "SingleFieldSubscriptionsRule", {
    enumerable: true,
    get: function() {
      return _SingleFieldSubscriptionsRule.SingleFieldSubscriptionsRule;
    }
  });
  Object.defineProperty(exports, "UniqueArgumentDefinitionNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueArgumentDefinitionNamesRule.UniqueArgumentDefinitionNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueArgumentNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueArgumentNamesRule.UniqueArgumentNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueDirectiveNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueDirectiveNamesRule.UniqueDirectiveNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueDirectivesPerLocationRule", {
    enumerable: true,
    get: function() {
      return _UniqueDirectivesPerLocationRule.UniqueDirectivesPerLocationRule;
    }
  });
  Object.defineProperty(exports, "UniqueEnumValueNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueEnumValueNamesRule.UniqueEnumValueNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueFieldDefinitionNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueFieldDefinitionNamesRule.UniqueFieldDefinitionNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueFragmentNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueFragmentNamesRule.UniqueFragmentNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueInputFieldNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueInputFieldNamesRule.UniqueInputFieldNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueOperationNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueOperationNamesRule.UniqueOperationNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueOperationTypesRule", {
    enumerable: true,
    get: function() {
      return _UniqueOperationTypesRule.UniqueOperationTypesRule;
    }
  });
  Object.defineProperty(exports, "UniqueTypeNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueTypeNamesRule.UniqueTypeNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueVariableNamesRule", {
    enumerable: true,
    get: function() {
      return _UniqueVariableNamesRule.UniqueVariableNamesRule;
    }
  });
  Object.defineProperty(exports, "ValidationContext", {
    enumerable: true,
    get: function() {
      return _ValidationContext.ValidationContext;
    }
  });
  Object.defineProperty(exports, "ValuesOfCorrectTypeRule", {
    enumerable: true,
    get: function() {
      return _ValuesOfCorrectTypeRule.ValuesOfCorrectTypeRule;
    }
  });
  Object.defineProperty(exports, "VariablesAreInputTypesRule", {
    enumerable: true,
    get: function() {
      return _VariablesAreInputTypesRule.VariablesAreInputTypesRule;
    }
  });
  Object.defineProperty(exports, "VariablesInAllowedPositionRule", {
    enumerable: true,
    get: function() {
      return _VariablesInAllowedPositionRule.VariablesInAllowedPositionRule;
    }
  });
  Object.defineProperty(exports, "recommendedRules", {
    enumerable: true,
    get: function() {
      return _specifiedRules.recommendedRules;
    }
  });
  Object.defineProperty(exports, "specifiedRules", {
    enumerable: true,
    get: function() {
      return _specifiedRules.specifiedRules;
    }
  });
  Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function() {
      return _validate.validate;
    }
  });
  var _validate = require_validate2();
  var _ValidationContext = require_ValidationContext();
  var _specifiedRules = require_specifiedRules();
  var _ExecutableDefinitionsRule = require_ExecutableDefinitionsRule();
  var _FieldsOnCorrectTypeRule = require_FieldsOnCorrectTypeRule();
  var _FragmentsOnCompositeTypesRule = require_FragmentsOnCompositeTypesRule();
  var _KnownArgumentNamesRule = require_KnownArgumentNamesRule();
  var _KnownDirectivesRule = require_KnownDirectivesRule();
  var _KnownFragmentNamesRule = require_KnownFragmentNamesRule();
  var _KnownTypeNamesRule = require_KnownTypeNamesRule();
  var _LoneAnonymousOperationRule = require_LoneAnonymousOperationRule();
  var _NoFragmentCyclesRule = require_NoFragmentCyclesRule();
  var _NoUndefinedVariablesRule = require_NoUndefinedVariablesRule();
  var _NoUnusedFragmentsRule = require_NoUnusedFragmentsRule();
  var _NoUnusedVariablesRule = require_NoUnusedVariablesRule();
  var _OverlappingFieldsCanBeMergedRule = require_OverlappingFieldsCanBeMergedRule();
  var _PossibleFragmentSpreadsRule = require_PossibleFragmentSpreadsRule();
  var _ProvidedRequiredArgumentsRule = require_ProvidedRequiredArgumentsRule();
  var _ScalarLeafsRule = require_ScalarLeafsRule();
  var _SingleFieldSubscriptionsRule = require_SingleFieldSubscriptionsRule();
  var _UniqueArgumentNamesRule = require_UniqueArgumentNamesRule();
  var _UniqueDirectivesPerLocationRule = require_UniqueDirectivesPerLocationRule();
  var _UniqueFragmentNamesRule = require_UniqueFragmentNamesRule();
  var _UniqueInputFieldNamesRule = require_UniqueInputFieldNamesRule();
  var _UniqueOperationNamesRule = require_UniqueOperationNamesRule();
  var _UniqueVariableNamesRule = require_UniqueVariableNamesRule();
  var _ValuesOfCorrectTypeRule = require_ValuesOfCorrectTypeRule();
  var _VariablesAreInputTypesRule = require_VariablesAreInputTypesRule();
  var _VariablesInAllowedPositionRule = require_VariablesInAllowedPositionRule();
  var _MaxIntrospectionDepthRule = require_MaxIntrospectionDepthRule();
  var _LoneSchemaDefinitionRule = require_LoneSchemaDefinitionRule();
  var _UniqueOperationTypesRule = require_UniqueOperationTypesRule();
  var _UniqueTypeNamesRule = require_UniqueTypeNamesRule();
  var _UniqueEnumValueNamesRule = require_UniqueEnumValueNamesRule();
  var _UniqueFieldDefinitionNamesRule = require_UniqueFieldDefinitionNamesRule();
  var _UniqueArgumentDefinitionNamesRule = require_UniqueArgumentDefinitionNamesRule();
  var _UniqueDirectiveNamesRule = require_UniqueDirectiveNamesRule();
  var _PossibleTypeExtensionsRule = require_PossibleTypeExtensionsRule();
  var _NoDeprecatedCustomRule = require_NoDeprecatedCustomRule();
  var _NoSchemaIntrospectionCustomRule = require_NoSchemaIntrospectionCustomRule();
});

// node_modules/graphql/error/index.js
var require_error = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "GraphQLError", {
    enumerable: true,
    get: function() {
      return _GraphQLError.GraphQLError;
    }
  });
  Object.defineProperty(exports, "formatError", {
    enumerable: true,
    get: function() {
      return _GraphQLError.formatError;
    }
  });
  Object.defineProperty(exports, "locatedError", {
    enumerable: true,
    get: function() {
      return _locatedError.locatedError;
    }
  });
  Object.defineProperty(exports, "printError", {
    enumerable: true,
    get: function() {
      return _GraphQLError.printError;
    }
  });
  Object.defineProperty(exports, "syntaxError", {
    enumerable: true,
    get: function() {
      return _syntaxError.syntaxError;
    }
  });
  var _GraphQLError = require_GraphQLError();
  var _syntaxError = require_syntaxError();
  var _locatedError = require_locatedError();
});

// node_modules/graphql/utilities/getIntrospectionQuery.js
var require_getIntrospectionQuery = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getIntrospectionQuery = getIntrospectionQuery;
  function getIntrospectionQuery(options) {
    const optionsWithDefault = {
      descriptions: true,
      specifiedByUrl: false,
      directiveIsRepeatable: false,
      schemaDescription: false,
      inputValueDeprecation: false,
      oneOf: false,
      ...options
    };
    const descriptions = optionsWithDefault.descriptions ? "description" : "";
    const specifiedByUrl = optionsWithDefault.specifiedByUrl ? "specifiedByURL" : "";
    const directiveIsRepeatable = optionsWithDefault.directiveIsRepeatable ? "isRepeatable" : "";
    const schemaDescription = optionsWithDefault.schemaDescription ? descriptions : "";
    function inputDeprecation(str) {
      return optionsWithDefault.inputValueDeprecation ? str : "";
    }
    const oneOf = optionsWithDefault.oneOf ? "isOneOf" : "";
    return `
    query IntrospectionQuery {
      __schema {
        ${schemaDescription}
        queryType { name kind }
        mutationType { name kind }
        subscriptionType { name kind }
        types {
          ...FullType
        }
        directives {
          name
          ${descriptions}
          ${directiveIsRepeatable}
          locations
          args${inputDeprecation("(includeDeprecated: true)")} {
            ...InputValue
          }
        }
      }
    }

    fragment FullType on __Type {
      kind
      name
      ${descriptions}
      ${specifiedByUrl}
      ${oneOf}
      fields(includeDeprecated: true) {
        name
        ${descriptions}
        args${inputDeprecation("(includeDeprecated: true)")} {
          ...InputValue
        }
        type {
          ...TypeRef
        }
        isDeprecated
        deprecationReason
      }
      inputFields${inputDeprecation("(includeDeprecated: true)")} {
        ...InputValue
      }
      interfaces {
        ...TypeRef
      }
      enumValues(includeDeprecated: true) {
        name
        ${descriptions}
        isDeprecated
        deprecationReason
      }
      possibleTypes {
        ...TypeRef
      }
    }

    fragment InputValue on __InputValue {
      name
      ${descriptions}
      type { ...TypeRef }
      defaultValue
      ${inputDeprecation("isDeprecated")}
      ${inputDeprecation("deprecationReason")}
    }

    fragment TypeRef on __Type {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
                ofType {
                  kind
                  name
                  ofType {
                    kind
                    name
                    ofType {
                      kind
                      name
                      ofType {
                        kind
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  }
});

// node_modules/graphql/utilities/getOperationAST.js
var require_getOperationAST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getOperationAST = getOperationAST;
  var _kinds = require_kinds();
  function getOperationAST(documentAST, operationName) {
    let operation = null;
    for (const definition of documentAST.definitions) {
      if (definition.kind === _kinds.Kind.OPERATION_DEFINITION) {
        var _definition$name;
        if (operationName == null) {
          if (operation) {
            return null;
          }
          operation = definition;
        } else if (((_definition$name = definition.name) === null || _definition$name === undefined ? undefined : _definition$name.value) === operationName) {
          return definition;
        }
      }
    }
    return operation;
  }
});

// node_modules/graphql/utilities/getOperationRootType.js
var require_getOperationRootType = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getOperationRootType = getOperationRootType;
  var _GraphQLError = require_GraphQLError();
  function getOperationRootType(schema, operation) {
    if (operation.operation === "query") {
      const queryType = schema.getQueryType();
      if (!queryType) {
        throw new _GraphQLError.GraphQLError("Schema does not define the required query root type.", {
          nodes: operation
        });
      }
      return queryType;
    }
    if (operation.operation === "mutation") {
      const mutationType = schema.getMutationType();
      if (!mutationType) {
        throw new _GraphQLError.GraphQLError("Schema is not configured for mutations.", {
          nodes: operation
        });
      }
      return mutationType;
    }
    if (operation.operation === "subscription") {
      const subscriptionType = schema.getSubscriptionType();
      if (!subscriptionType) {
        throw new _GraphQLError.GraphQLError("Schema is not configured for subscriptions.", {
          nodes: operation
        });
      }
      return subscriptionType;
    }
    throw new _GraphQLError.GraphQLError("Can only have query, mutation and subscription operations.", {
      nodes: operation
    });
  }
});

// node_modules/graphql/utilities/introspectionFromSchema.js
var require_introspectionFromSchema = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.introspectionFromSchema = introspectionFromSchema;
  var _invariant = require_invariant();
  var _parser = require_parser();
  var _execute = require_execute();
  var _getIntrospectionQuery = require_getIntrospectionQuery();
  function introspectionFromSchema(schema, options) {
    const optionsWithDefaults = {
      specifiedByUrl: true,
      directiveIsRepeatable: true,
      schemaDescription: true,
      inputValueDeprecation: true,
      oneOf: true,
      ...options
    };
    const document = (0, _parser.parse)((0, _getIntrospectionQuery.getIntrospectionQuery)(optionsWithDefaults));
    const result = (0, _execute.executeSync)({
      schema,
      document
    });
    !result.errors && result.data || (0, _invariant.invariant)(false);
    return result.data;
  }
});

// node_modules/graphql/utilities/buildClientSchema.js
var require_buildClientSchema = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.buildClientSchema = buildClientSchema;
  var _devAssert = require_devAssert();
  var _inspect = require_inspect();
  var _isObjectLike = require_isObjectLike();
  var _keyValMap = require_keyValMap();
  var _parser = require_parser();
  var _definition = require_definition();
  var _directives = require_directives();
  var _introspection = require_introspection();
  var _scalars = require_scalars();
  var _schema = require_schema();
  var _valueFromAST = require_valueFromAST();
  function buildClientSchema(introspection, options) {
    (0, _isObjectLike.isObjectLike)(introspection) && (0, _isObjectLike.isObjectLike)(introspection.__schema) || (0, _devAssert.devAssert)(false, `Invalid or incomplete introspection result. Ensure that you are passing "data" property of introspection response and no "errors" was returned alongside: ${(0, _inspect.inspect)(introspection)}.`);
    const schemaIntrospection = introspection.__schema;
    const typeMap = (0, _keyValMap.keyValMap)(schemaIntrospection.types, (typeIntrospection) => typeIntrospection.name, (typeIntrospection) => buildType(typeIntrospection));
    for (const stdType of [
      ..._scalars.specifiedScalarTypes,
      ..._introspection.introspectionTypes
    ]) {
      if (typeMap[stdType.name]) {
        typeMap[stdType.name] = stdType;
      }
    }
    const queryType = schemaIntrospection.queryType ? getObjectType(schemaIntrospection.queryType) : null;
    const mutationType = schemaIntrospection.mutationType ? getObjectType(schemaIntrospection.mutationType) : null;
    const subscriptionType = schemaIntrospection.subscriptionType ? getObjectType(schemaIntrospection.subscriptionType) : null;
    const directives = schemaIntrospection.directives ? schemaIntrospection.directives.map(buildDirective) : [];
    return new _schema.GraphQLSchema({
      description: schemaIntrospection.description,
      query: queryType,
      mutation: mutationType,
      subscription: subscriptionType,
      types: Object.values(typeMap),
      directives,
      assumeValid: options === null || options === undefined ? undefined : options.assumeValid
    });
    function getType(typeRef) {
      if (typeRef.kind === _introspection.TypeKind.LIST) {
        const itemRef = typeRef.ofType;
        if (!itemRef) {
          throw new Error("Decorated type deeper than introspection query.");
        }
        return new _definition.GraphQLList(getType(itemRef));
      }
      if (typeRef.kind === _introspection.TypeKind.NON_NULL) {
        const nullableRef = typeRef.ofType;
        if (!nullableRef) {
          throw new Error("Decorated type deeper than introspection query.");
        }
        const nullableType2 = getType(nullableRef);
        return new _definition.GraphQLNonNull((0, _definition.assertNullableType)(nullableType2));
      }
      return getNamedType(typeRef);
    }
    function getNamedType(typeRef) {
      const typeName = typeRef.name;
      if (!typeName) {
        throw new Error(`Unknown type reference: ${(0, _inspect.inspect)(typeRef)}.`);
      }
      const type = typeMap[typeName];
      if (!type) {
        throw new Error(`Invalid or incomplete schema, unknown type: ${typeName}. Ensure that a full introspection query is used in order to build a client schema.`);
      }
      return type;
    }
    function getObjectType(typeRef) {
      return (0, _definition.assertObjectType)(getNamedType(typeRef));
    }
    function getInterfaceType(typeRef) {
      return (0, _definition.assertInterfaceType)(getNamedType(typeRef));
    }
    function buildType(type) {
      if (type != null && type.name != null && type.kind != null) {
        switch (type.kind) {
          case _introspection.TypeKind.SCALAR:
            return buildScalarDef(type);
          case _introspection.TypeKind.OBJECT:
            return buildObjectDef(type);
          case _introspection.TypeKind.INTERFACE:
            return buildInterfaceDef(type);
          case _introspection.TypeKind.UNION:
            return buildUnionDef(type);
          case _introspection.TypeKind.ENUM:
            return buildEnumDef(type);
          case _introspection.TypeKind.INPUT_OBJECT:
            return buildInputObjectDef(type);
        }
      }
      const typeStr = (0, _inspect.inspect)(type);
      throw new Error(`Invalid or incomplete introspection result. Ensure that a full introspection query is used in order to build a client schema: ${typeStr}.`);
    }
    function buildScalarDef(scalarIntrospection) {
      return new _definition.GraphQLScalarType({
        name: scalarIntrospection.name,
        description: scalarIntrospection.description,
        specifiedByURL: scalarIntrospection.specifiedByURL
      });
    }
    function buildImplementationsList(implementingIntrospection) {
      if (implementingIntrospection.interfaces === null && implementingIntrospection.kind === _introspection.TypeKind.INTERFACE) {
        return [];
      }
      if (!implementingIntrospection.interfaces) {
        const implementingIntrospectionStr = (0, _inspect.inspect)(implementingIntrospection);
        throw new Error(`Introspection result missing interfaces: ${implementingIntrospectionStr}.`);
      }
      return implementingIntrospection.interfaces.map(getInterfaceType);
    }
    function buildObjectDef(objectIntrospection) {
      return new _definition.GraphQLObjectType({
        name: objectIntrospection.name,
        description: objectIntrospection.description,
        interfaces: () => buildImplementationsList(objectIntrospection),
        fields: () => buildFieldDefMap(objectIntrospection)
      });
    }
    function buildInterfaceDef(interfaceIntrospection) {
      return new _definition.GraphQLInterfaceType({
        name: interfaceIntrospection.name,
        description: interfaceIntrospection.description,
        interfaces: () => buildImplementationsList(interfaceIntrospection),
        fields: () => buildFieldDefMap(interfaceIntrospection)
      });
    }
    function buildUnionDef(unionIntrospection) {
      if (!unionIntrospection.possibleTypes) {
        const unionIntrospectionStr = (0, _inspect.inspect)(unionIntrospection);
        throw new Error(`Introspection result missing possibleTypes: ${unionIntrospectionStr}.`);
      }
      return new _definition.GraphQLUnionType({
        name: unionIntrospection.name,
        description: unionIntrospection.description,
        types: () => unionIntrospection.possibleTypes.map(getObjectType)
      });
    }
    function buildEnumDef(enumIntrospection) {
      if (!enumIntrospection.enumValues) {
        const enumIntrospectionStr = (0, _inspect.inspect)(enumIntrospection);
        throw new Error(`Introspection result missing enumValues: ${enumIntrospectionStr}.`);
      }
      return new _definition.GraphQLEnumType({
        name: enumIntrospection.name,
        description: enumIntrospection.description,
        values: (0, _keyValMap.keyValMap)(enumIntrospection.enumValues, (valueIntrospection) => valueIntrospection.name, (valueIntrospection) => ({
          description: valueIntrospection.description,
          deprecationReason: valueIntrospection.deprecationReason
        }))
      });
    }
    function buildInputObjectDef(inputObjectIntrospection) {
      if (!inputObjectIntrospection.inputFields) {
        const inputObjectIntrospectionStr = (0, _inspect.inspect)(inputObjectIntrospection);
        throw new Error(`Introspection result missing inputFields: ${inputObjectIntrospectionStr}.`);
      }
      return new _definition.GraphQLInputObjectType({
        name: inputObjectIntrospection.name,
        description: inputObjectIntrospection.description,
        fields: () => buildInputValueDefMap(inputObjectIntrospection.inputFields),
        isOneOf: inputObjectIntrospection.isOneOf
      });
    }
    function buildFieldDefMap(typeIntrospection) {
      if (!typeIntrospection.fields) {
        throw new Error(`Introspection result missing fields: ${(0, _inspect.inspect)(typeIntrospection)}.`);
      }
      return (0, _keyValMap.keyValMap)(typeIntrospection.fields, (fieldIntrospection) => fieldIntrospection.name, buildField);
    }
    function buildField(fieldIntrospection) {
      const type = getType(fieldIntrospection.type);
      if (!(0, _definition.isOutputType)(type)) {
        const typeStr = (0, _inspect.inspect)(type);
        throw new Error(`Introspection must provide output type for fields, but received: ${typeStr}.`);
      }
      if (!fieldIntrospection.args) {
        const fieldIntrospectionStr = (0, _inspect.inspect)(fieldIntrospection);
        throw new Error(`Introspection result missing field args: ${fieldIntrospectionStr}.`);
      }
      return {
        description: fieldIntrospection.description,
        deprecationReason: fieldIntrospection.deprecationReason,
        type,
        args: buildInputValueDefMap(fieldIntrospection.args)
      };
    }
    function buildInputValueDefMap(inputValueIntrospections) {
      return (0, _keyValMap.keyValMap)(inputValueIntrospections, (inputValue) => inputValue.name, buildInputValue);
    }
    function buildInputValue(inputValueIntrospection) {
      const type = getType(inputValueIntrospection.type);
      if (!(0, _definition.isInputType)(type)) {
        const typeStr = (0, _inspect.inspect)(type);
        throw new Error(`Introspection must provide input type for arguments, but received: ${typeStr}.`);
      }
      const defaultValue = inputValueIntrospection.defaultValue != null ? (0, _valueFromAST.valueFromAST)((0, _parser.parseValue)(inputValueIntrospection.defaultValue), type) : undefined;
      return {
        description: inputValueIntrospection.description,
        type,
        defaultValue,
        deprecationReason: inputValueIntrospection.deprecationReason
      };
    }
    function buildDirective(directiveIntrospection) {
      if (!directiveIntrospection.args) {
        const directiveIntrospectionStr = (0, _inspect.inspect)(directiveIntrospection);
        throw new Error(`Introspection result missing directive args: ${directiveIntrospectionStr}.`);
      }
      if (!directiveIntrospection.locations) {
        const directiveIntrospectionStr = (0, _inspect.inspect)(directiveIntrospection);
        throw new Error(`Introspection result missing directive locations: ${directiveIntrospectionStr}.`);
      }
      return new _directives.GraphQLDirective({
        name: directiveIntrospection.name,
        description: directiveIntrospection.description,
        isRepeatable: directiveIntrospection.isRepeatable,
        locations: directiveIntrospection.locations.slice(),
        args: buildInputValueDefMap(directiveIntrospection.args)
      });
    }
  }
});

// node_modules/graphql/utilities/extendSchema.js
var require_extendSchema = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.extendSchema = extendSchema;
  exports.extendSchemaImpl = extendSchemaImpl;
  var _devAssert = require_devAssert();
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _keyMap = require_keyMap();
  var _mapValue = require_mapValue();
  var _kinds = require_kinds();
  var _predicates = require_predicates();
  var _definition = require_definition();
  var _directives = require_directives();
  var _introspection = require_introspection();
  var _scalars = require_scalars();
  var _schema = require_schema();
  var _validate = require_validate2();
  var _values = require_values();
  var _valueFromAST = require_valueFromAST();
  function extendSchema(schema, documentAST, options) {
    (0, _schema.assertSchema)(schema);
    documentAST != null && documentAST.kind === _kinds.Kind.DOCUMENT || (0, _devAssert.devAssert)(false, "Must provide valid Document AST.");
    if ((options === null || options === undefined ? undefined : options.assumeValid) !== true && (options === null || options === undefined ? undefined : options.assumeValidSDL) !== true) {
      (0, _validate.assertValidSDLExtension)(documentAST, schema);
    }
    const schemaConfig = schema.toConfig();
    const extendedConfig = extendSchemaImpl(schemaConfig, documentAST, options);
    return schemaConfig === extendedConfig ? schema : new _schema.GraphQLSchema(extendedConfig);
  }
  function extendSchemaImpl(schemaConfig, documentAST, options) {
    var _schemaDef, _schemaDef$descriptio, _schemaDef2, _options$assumeValid;
    const typeDefs = [];
    const typeExtensionsMap = Object.create(null);
    const directiveDefs = [];
    let schemaDef;
    const schemaExtensions = [];
    for (const def of documentAST.definitions) {
      if (def.kind === _kinds.Kind.SCHEMA_DEFINITION) {
        schemaDef = def;
      } else if (def.kind === _kinds.Kind.SCHEMA_EXTENSION) {
        schemaExtensions.push(def);
      } else if ((0, _predicates.isTypeDefinitionNode)(def)) {
        typeDefs.push(def);
      } else if ((0, _predicates.isTypeExtensionNode)(def)) {
        const extendedTypeName = def.name.value;
        const existingTypeExtensions = typeExtensionsMap[extendedTypeName];
        typeExtensionsMap[extendedTypeName] = existingTypeExtensions ? existingTypeExtensions.concat([def]) : [def];
      } else if (def.kind === _kinds.Kind.DIRECTIVE_DEFINITION) {
        directiveDefs.push(def);
      }
    }
    if (Object.keys(typeExtensionsMap).length === 0 && typeDefs.length === 0 && directiveDefs.length === 0 && schemaExtensions.length === 0 && schemaDef == null) {
      return schemaConfig;
    }
    const typeMap = Object.create(null);
    for (const existingType of schemaConfig.types) {
      typeMap[existingType.name] = extendNamedType(existingType);
    }
    for (const typeNode of typeDefs) {
      var _stdTypeMap$name;
      const name = typeNode.name.value;
      typeMap[name] = (_stdTypeMap$name = stdTypeMap[name]) !== null && _stdTypeMap$name !== undefined ? _stdTypeMap$name : buildType(typeNode);
    }
    const operationTypes = {
      query: schemaConfig.query && replaceNamedType(schemaConfig.query),
      mutation: schemaConfig.mutation && replaceNamedType(schemaConfig.mutation),
      subscription: schemaConfig.subscription && replaceNamedType(schemaConfig.subscription),
      ...schemaDef && getOperationTypes([schemaDef]),
      ...getOperationTypes(schemaExtensions)
    };
    return {
      description: (_schemaDef = schemaDef) === null || _schemaDef === undefined ? undefined : (_schemaDef$descriptio = _schemaDef.description) === null || _schemaDef$descriptio === undefined ? undefined : _schemaDef$descriptio.value,
      ...operationTypes,
      types: Object.values(typeMap),
      directives: [
        ...schemaConfig.directives.map(replaceDirective),
        ...directiveDefs.map(buildDirective)
      ],
      extensions: Object.create(null),
      astNode: (_schemaDef2 = schemaDef) !== null && _schemaDef2 !== undefined ? _schemaDef2 : schemaConfig.astNode,
      extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExtensions),
      assumeValid: (_options$assumeValid = options === null || options === undefined ? undefined : options.assumeValid) !== null && _options$assumeValid !== undefined ? _options$assumeValid : false
    };
    function replaceType(type) {
      if ((0, _definition.isListType)(type)) {
        return new _definition.GraphQLList(replaceType(type.ofType));
      }
      if ((0, _definition.isNonNullType)(type)) {
        return new _definition.GraphQLNonNull(replaceType(type.ofType));
      }
      return replaceNamedType(type);
    }
    function replaceNamedType(type) {
      return typeMap[type.name];
    }
    function replaceDirective(directive) {
      const config = directive.toConfig();
      return new _directives.GraphQLDirective({
        ...config,
        args: (0, _mapValue.mapValue)(config.args, extendArg)
      });
    }
    function extendNamedType(type) {
      if ((0, _introspection.isIntrospectionType)(type) || (0, _scalars.isSpecifiedScalarType)(type)) {
        return type;
      }
      if ((0, _definition.isScalarType)(type)) {
        return extendScalarType(type);
      }
      if ((0, _definition.isObjectType)(type)) {
        return extendObjectType(type);
      }
      if ((0, _definition.isInterfaceType)(type)) {
        return extendInterfaceType(type);
      }
      if ((0, _definition.isUnionType)(type)) {
        return extendUnionType(type);
      }
      if ((0, _definition.isEnumType)(type)) {
        return extendEnumType(type);
      }
      if ((0, _definition.isInputObjectType)(type)) {
        return extendInputObjectType(type);
      }
      (0, _invariant.invariant)(false, "Unexpected type: " + (0, _inspect.inspect)(type));
    }
    function extendInputObjectType(type) {
      var _typeExtensionsMap$co;
      const config = type.toConfig();
      const extensions = (_typeExtensionsMap$co = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co !== undefined ? _typeExtensionsMap$co : [];
      return new _definition.GraphQLInputObjectType({
        ...config,
        fields: () => ({
          ...(0, _mapValue.mapValue)(config.fields, (field) => ({
            ...field,
            type: replaceType(field.type)
          })),
          ...buildInputFieldMap(extensions)
        }),
        extensionASTNodes: config.extensionASTNodes.concat(extensions)
      });
    }
    function extendEnumType(type) {
      var _typeExtensionsMap$ty;
      const config = type.toConfig();
      const extensions = (_typeExtensionsMap$ty = typeExtensionsMap[type.name]) !== null && _typeExtensionsMap$ty !== undefined ? _typeExtensionsMap$ty : [];
      return new _definition.GraphQLEnumType({
        ...config,
        values: { ...config.values, ...buildEnumValueMap(extensions) },
        extensionASTNodes: config.extensionASTNodes.concat(extensions)
      });
    }
    function extendScalarType(type) {
      var _typeExtensionsMap$co2;
      const config = type.toConfig();
      const extensions = (_typeExtensionsMap$co2 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co2 !== undefined ? _typeExtensionsMap$co2 : [];
      let specifiedByURL = config.specifiedByURL;
      for (const extensionNode of extensions) {
        var _getSpecifiedByURL;
        specifiedByURL = (_getSpecifiedByURL = getSpecifiedByURL(extensionNode)) !== null && _getSpecifiedByURL !== undefined ? _getSpecifiedByURL : specifiedByURL;
      }
      return new _definition.GraphQLScalarType({
        ...config,
        specifiedByURL,
        extensionASTNodes: config.extensionASTNodes.concat(extensions)
      });
    }
    function extendObjectType(type) {
      var _typeExtensionsMap$co3;
      const config = type.toConfig();
      const extensions = (_typeExtensionsMap$co3 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co3 !== undefined ? _typeExtensionsMap$co3 : [];
      return new _definition.GraphQLObjectType({
        ...config,
        interfaces: () => [
          ...type.getInterfaces().map(replaceNamedType),
          ...buildInterfaces(extensions)
        ],
        fields: () => ({
          ...(0, _mapValue.mapValue)(config.fields, extendField),
          ...buildFieldMap(extensions)
        }),
        extensionASTNodes: config.extensionASTNodes.concat(extensions)
      });
    }
    function extendInterfaceType(type) {
      var _typeExtensionsMap$co4;
      const config = type.toConfig();
      const extensions = (_typeExtensionsMap$co4 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co4 !== undefined ? _typeExtensionsMap$co4 : [];
      return new _definition.GraphQLInterfaceType({
        ...config,
        interfaces: () => [
          ...type.getInterfaces().map(replaceNamedType),
          ...buildInterfaces(extensions)
        ],
        fields: () => ({
          ...(0, _mapValue.mapValue)(config.fields, extendField),
          ...buildFieldMap(extensions)
        }),
        extensionASTNodes: config.extensionASTNodes.concat(extensions)
      });
    }
    function extendUnionType(type) {
      var _typeExtensionsMap$co5;
      const config = type.toConfig();
      const extensions = (_typeExtensionsMap$co5 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co5 !== undefined ? _typeExtensionsMap$co5 : [];
      return new _definition.GraphQLUnionType({
        ...config,
        types: () => [
          ...type.getTypes().map(replaceNamedType),
          ...buildUnionTypes(extensions)
        ],
        extensionASTNodes: config.extensionASTNodes.concat(extensions)
      });
    }
    function extendField(field) {
      return {
        ...field,
        type: replaceType(field.type),
        args: field.args && (0, _mapValue.mapValue)(field.args, extendArg)
      };
    }
    function extendArg(arg) {
      return { ...arg, type: replaceType(arg.type) };
    }
    function getOperationTypes(nodes) {
      const opTypes = {};
      for (const node of nodes) {
        var _node$operationTypes;
        const operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== undefined ? _node$operationTypes : [];
        for (const operationType of operationTypesNodes) {
          opTypes[operationType.operation] = getNamedType(operationType.type);
        }
      }
      return opTypes;
    }
    function getNamedType(node) {
      var _stdTypeMap$name2;
      const name = node.name.value;
      const type = (_stdTypeMap$name2 = stdTypeMap[name]) !== null && _stdTypeMap$name2 !== undefined ? _stdTypeMap$name2 : typeMap[name];
      if (type === undefined) {
        throw new Error(`Unknown type: "${name}".`);
      }
      return type;
    }
    function getWrappedType(node) {
      if (node.kind === _kinds.Kind.LIST_TYPE) {
        return new _definition.GraphQLList(getWrappedType(node.type));
      }
      if (node.kind === _kinds.Kind.NON_NULL_TYPE) {
        return new _definition.GraphQLNonNull(getWrappedType(node.type));
      }
      return getNamedType(node);
    }
    function buildDirective(node) {
      var _node$description;
      return new _directives.GraphQLDirective({
        name: node.name.value,
        description: (_node$description = node.description) === null || _node$description === undefined ? undefined : _node$description.value,
        locations: node.locations.map(({ value }) => value),
        isRepeatable: node.repeatable,
        args: buildArgumentMap(node.arguments),
        astNode: node
      });
    }
    function buildFieldMap(nodes) {
      const fieldConfigMap = Object.create(null);
      for (const node of nodes) {
        var _node$fields;
        const nodeFields = (_node$fields = node.fields) !== null && _node$fields !== undefined ? _node$fields : [];
        for (const field of nodeFields) {
          var _field$description;
          fieldConfigMap[field.name.value] = {
            type: getWrappedType(field.type),
            description: (_field$description = field.description) === null || _field$description === undefined ? undefined : _field$description.value,
            args: buildArgumentMap(field.arguments),
            deprecationReason: getDeprecationReason(field),
            astNode: field
          };
        }
      }
      return fieldConfigMap;
    }
    function buildArgumentMap(args) {
      const argsNodes = args !== null && args !== undefined ? args : [];
      const argConfigMap = Object.create(null);
      for (const arg of argsNodes) {
        var _arg$description;
        const type = getWrappedType(arg.type);
        argConfigMap[arg.name.value] = {
          type,
          description: (_arg$description = arg.description) === null || _arg$description === undefined ? undefined : _arg$description.value,
          defaultValue: (0, _valueFromAST.valueFromAST)(arg.defaultValue, type),
          deprecationReason: getDeprecationReason(arg),
          astNode: arg
        };
      }
      return argConfigMap;
    }
    function buildInputFieldMap(nodes) {
      const inputFieldMap = Object.create(null);
      for (const node of nodes) {
        var _node$fields2;
        const fieldsNodes = (_node$fields2 = node.fields) !== null && _node$fields2 !== undefined ? _node$fields2 : [];
        for (const field of fieldsNodes) {
          var _field$description2;
          const type = getWrappedType(field.type);
          inputFieldMap[field.name.value] = {
            type,
            description: (_field$description2 = field.description) === null || _field$description2 === undefined ? undefined : _field$description2.value,
            defaultValue: (0, _valueFromAST.valueFromAST)(field.defaultValue, type),
            deprecationReason: getDeprecationReason(field),
            astNode: field
          };
        }
      }
      return inputFieldMap;
    }
    function buildEnumValueMap(nodes) {
      const enumValueMap = Object.create(null);
      for (const node of nodes) {
        var _node$values;
        const valuesNodes = (_node$values = node.values) !== null && _node$values !== undefined ? _node$values : [];
        for (const value of valuesNodes) {
          var _value$description;
          enumValueMap[value.name.value] = {
            description: (_value$description = value.description) === null || _value$description === undefined ? undefined : _value$description.value,
            deprecationReason: getDeprecationReason(value),
            astNode: value
          };
        }
      }
      return enumValueMap;
    }
    function buildInterfaces(nodes) {
      return nodes.flatMap((node) => {
        var _node$interfaces$map, _node$interfaces;
        return (_node$interfaces$map = (_node$interfaces = node.interfaces) === null || _node$interfaces === undefined ? undefined : _node$interfaces.map(getNamedType)) !== null && _node$interfaces$map !== undefined ? _node$interfaces$map : [];
      });
    }
    function buildUnionTypes(nodes) {
      return nodes.flatMap((node) => {
        var _node$types$map, _node$types;
        return (_node$types$map = (_node$types = node.types) === null || _node$types === undefined ? undefined : _node$types.map(getNamedType)) !== null && _node$types$map !== undefined ? _node$types$map : [];
      });
    }
    function buildType(astNode) {
      var _typeExtensionsMap$na;
      const name = astNode.name.value;
      const extensionASTNodes = (_typeExtensionsMap$na = typeExtensionsMap[name]) !== null && _typeExtensionsMap$na !== undefined ? _typeExtensionsMap$na : [];
      switch (astNode.kind) {
        case _kinds.Kind.OBJECT_TYPE_DEFINITION: {
          var _astNode$description;
          const allNodes = [astNode, ...extensionASTNodes];
          return new _definition.GraphQLObjectType({
            name,
            description: (_astNode$description = astNode.description) === null || _astNode$description === undefined ? undefined : _astNode$description.value,
            interfaces: () => buildInterfaces(allNodes),
            fields: () => buildFieldMap(allNodes),
            astNode,
            extensionASTNodes
          });
        }
        case _kinds.Kind.INTERFACE_TYPE_DEFINITION: {
          var _astNode$description2;
          const allNodes = [astNode, ...extensionASTNodes];
          return new _definition.GraphQLInterfaceType({
            name,
            description: (_astNode$description2 = astNode.description) === null || _astNode$description2 === undefined ? undefined : _astNode$description2.value,
            interfaces: () => buildInterfaces(allNodes),
            fields: () => buildFieldMap(allNodes),
            astNode,
            extensionASTNodes
          });
        }
        case _kinds.Kind.ENUM_TYPE_DEFINITION: {
          var _astNode$description3;
          const allNodes = [astNode, ...extensionASTNodes];
          return new _definition.GraphQLEnumType({
            name,
            description: (_astNode$description3 = astNode.description) === null || _astNode$description3 === undefined ? undefined : _astNode$description3.value,
            values: buildEnumValueMap(allNodes),
            astNode,
            extensionASTNodes
          });
        }
        case _kinds.Kind.UNION_TYPE_DEFINITION: {
          var _astNode$description4;
          const allNodes = [astNode, ...extensionASTNodes];
          return new _definition.GraphQLUnionType({
            name,
            description: (_astNode$description4 = astNode.description) === null || _astNode$description4 === undefined ? undefined : _astNode$description4.value,
            types: () => buildUnionTypes(allNodes),
            astNode,
            extensionASTNodes
          });
        }
        case _kinds.Kind.SCALAR_TYPE_DEFINITION: {
          var _astNode$description5;
          return new _definition.GraphQLScalarType({
            name,
            description: (_astNode$description5 = astNode.description) === null || _astNode$description5 === undefined ? undefined : _astNode$description5.value,
            specifiedByURL: getSpecifiedByURL(astNode),
            astNode,
            extensionASTNodes
          });
        }
        case _kinds.Kind.INPUT_OBJECT_TYPE_DEFINITION: {
          var _astNode$description6;
          const allNodes = [astNode, ...extensionASTNodes];
          return new _definition.GraphQLInputObjectType({
            name,
            description: (_astNode$description6 = astNode.description) === null || _astNode$description6 === undefined ? undefined : _astNode$description6.value,
            fields: () => buildInputFieldMap(allNodes),
            astNode,
            extensionASTNodes,
            isOneOf: isOneOf(astNode)
          });
        }
      }
    }
  }
  var stdTypeMap = (0, _keyMap.keyMap)([..._scalars.specifiedScalarTypes, ..._introspection.introspectionTypes], (type) => type.name);
  function getDeprecationReason(node) {
    const deprecated = (0, _values.getDirectiveValues)(_directives.GraphQLDeprecatedDirective, node);
    return deprecated === null || deprecated === undefined ? undefined : deprecated.reason;
  }
  function getSpecifiedByURL(node) {
    const specifiedBy = (0, _values.getDirectiveValues)(_directives.GraphQLSpecifiedByDirective, node);
    return specifiedBy === null || specifiedBy === undefined ? undefined : specifiedBy.url;
  }
  function isOneOf(node) {
    return Boolean((0, _values.getDirectiveValues)(_directives.GraphQLOneOfDirective, node));
  }
});

// node_modules/graphql/utilities/buildASTSchema.js
var require_buildASTSchema = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.buildASTSchema = buildASTSchema;
  exports.buildSchema = buildSchema;
  var _devAssert = require_devAssert();
  var _kinds = require_kinds();
  var _parser = require_parser();
  var _directives = require_directives();
  var _schema = require_schema();
  var _validate = require_validate2();
  var _extendSchema = require_extendSchema();
  function buildASTSchema(documentAST, options) {
    documentAST != null && documentAST.kind === _kinds.Kind.DOCUMENT || (0, _devAssert.devAssert)(false, "Must provide valid Document AST.");
    if ((options === null || options === undefined ? undefined : options.assumeValid) !== true && (options === null || options === undefined ? undefined : options.assumeValidSDL) !== true) {
      (0, _validate.assertValidSDL)(documentAST);
    }
    const emptySchemaConfig = {
      description: undefined,
      types: [],
      directives: [],
      extensions: Object.create(null),
      extensionASTNodes: [],
      assumeValid: false
    };
    const config = (0, _extendSchema.extendSchemaImpl)(emptySchemaConfig, documentAST, options);
    if (config.astNode == null) {
      for (const type of config.types) {
        switch (type.name) {
          case "Query":
            config.query = type;
            break;
          case "Mutation":
            config.mutation = type;
            break;
          case "Subscription":
            config.subscription = type;
            break;
        }
      }
    }
    const directives = [
      ...config.directives,
      ..._directives.specifiedDirectives.filter((stdDirective) => config.directives.every((directive) => directive.name !== stdDirective.name))
    ];
    return new _schema.GraphQLSchema({ ...config, directives });
  }
  function buildSchema(source, options) {
    const document = (0, _parser.parse)(source, {
      noLocation: options === null || options === undefined ? undefined : options.noLocation,
      allowLegacyFragmentVariables: options === null || options === undefined ? undefined : options.allowLegacyFragmentVariables
    });
    return buildASTSchema(document, {
      assumeValidSDL: options === null || options === undefined ? undefined : options.assumeValidSDL,
      assumeValid: options === null || options === undefined ? undefined : options.assumeValid
    });
  }
});

// node_modules/graphql/utilities/lexicographicSortSchema.js
var require_lexicographicSortSchema = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.lexicographicSortSchema = lexicographicSortSchema;
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _keyValMap = require_keyValMap();
  var _naturalCompare = require_naturalCompare();
  var _definition = require_definition();
  var _directives = require_directives();
  var _introspection = require_introspection();
  var _schema = require_schema();
  function lexicographicSortSchema(schema) {
    const schemaConfig = schema.toConfig();
    const typeMap = (0, _keyValMap.keyValMap)(sortByName(schemaConfig.types), (type) => type.name, sortNamedType);
    return new _schema.GraphQLSchema({
      ...schemaConfig,
      types: Object.values(typeMap),
      directives: sortByName(schemaConfig.directives).map(sortDirective),
      query: replaceMaybeType(schemaConfig.query),
      mutation: replaceMaybeType(schemaConfig.mutation),
      subscription: replaceMaybeType(schemaConfig.subscription)
    });
    function replaceType(type) {
      if ((0, _definition.isListType)(type)) {
        return new _definition.GraphQLList(replaceType(type.ofType));
      } else if ((0, _definition.isNonNullType)(type)) {
        return new _definition.GraphQLNonNull(replaceType(type.ofType));
      }
      return replaceNamedType(type);
    }
    function replaceNamedType(type) {
      return typeMap[type.name];
    }
    function replaceMaybeType(maybeType) {
      return maybeType && replaceNamedType(maybeType);
    }
    function sortDirective(directive) {
      const config = directive.toConfig();
      return new _directives.GraphQLDirective({
        ...config,
        locations: sortBy(config.locations, (x) => x),
        args: sortArgs(config.args)
      });
    }
    function sortArgs(args) {
      return sortObjMap(args, (arg) => ({ ...arg, type: replaceType(arg.type) }));
    }
    function sortFields(fieldsMap) {
      return sortObjMap(fieldsMap, (field) => ({
        ...field,
        type: replaceType(field.type),
        args: field.args && sortArgs(field.args)
      }));
    }
    function sortInputFields(fieldsMap) {
      return sortObjMap(fieldsMap, (field) => ({
        ...field,
        type: replaceType(field.type)
      }));
    }
    function sortTypes(array2) {
      return sortByName(array2).map(replaceNamedType);
    }
    function sortNamedType(type) {
      if ((0, _definition.isScalarType)(type) || (0, _introspection.isIntrospectionType)(type)) {
        return type;
      }
      if ((0, _definition.isObjectType)(type)) {
        const config = type.toConfig();
        return new _definition.GraphQLObjectType({
          ...config,
          interfaces: () => sortTypes(config.interfaces),
          fields: () => sortFields(config.fields)
        });
      }
      if ((0, _definition.isInterfaceType)(type)) {
        const config = type.toConfig();
        return new _definition.GraphQLInterfaceType({
          ...config,
          interfaces: () => sortTypes(config.interfaces),
          fields: () => sortFields(config.fields)
        });
      }
      if ((0, _definition.isUnionType)(type)) {
        const config = type.toConfig();
        return new _definition.GraphQLUnionType({
          ...config,
          types: () => sortTypes(config.types)
        });
      }
      if ((0, _definition.isEnumType)(type)) {
        const config = type.toConfig();
        return new _definition.GraphQLEnumType({
          ...config,
          values: sortObjMap(config.values, (value) => value)
        });
      }
      if ((0, _definition.isInputObjectType)(type)) {
        const config = type.toConfig();
        return new _definition.GraphQLInputObjectType({
          ...config,
          fields: () => sortInputFields(config.fields)
        });
      }
      (0, _invariant.invariant)(false, "Unexpected type: " + (0, _inspect.inspect)(type));
    }
  }
  function sortObjMap(map2, sortValueFn) {
    const sortedMap = Object.create(null);
    for (const key of Object.keys(map2).sort(_naturalCompare.naturalCompare)) {
      sortedMap[key] = sortValueFn(map2[key]);
    }
    return sortedMap;
  }
  function sortByName(array2) {
    return sortBy(array2, (obj) => obj.name);
  }
  function sortBy(array2, mapToKey) {
    return array2.slice().sort((obj1, obj2) => {
      const key1 = mapToKey(obj1);
      const key2 = mapToKey(obj2);
      return (0, _naturalCompare.naturalCompare)(key1, key2);
    });
  }
});

// node_modules/graphql/utilities/printSchema.js
var require_printSchema = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.printIntrospectionSchema = printIntrospectionSchema;
  exports.printSchema = printSchema;
  exports.printType = printType;
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _blockString = require_blockString();
  var _kinds = require_kinds();
  var _printer = require_printer();
  var _definition = require_definition();
  var _directives = require_directives();
  var _introspection = require_introspection();
  var _scalars = require_scalars();
  var _astFromValue = require_astFromValue();
  function printSchema(schema) {
    return printFilteredSchema(schema, (n) => !(0, _directives.isSpecifiedDirective)(n), isDefinedType);
  }
  function printIntrospectionSchema(schema) {
    return printFilteredSchema(schema, _directives.isSpecifiedDirective, _introspection.isIntrospectionType);
  }
  function isDefinedType(type) {
    return !(0, _scalars.isSpecifiedScalarType)(type) && !(0, _introspection.isIntrospectionType)(type);
  }
  function printFilteredSchema(schema, directiveFilter, typeFilter) {
    const directives = schema.getDirectives().filter(directiveFilter);
    const types2 = Object.values(schema.getTypeMap()).filter(typeFilter);
    return [
      printSchemaDefinition(schema),
      ...directives.map((directive) => printDirective(directive)),
      ...types2.map((type) => printType(type))
    ].filter(Boolean).join(`

`);
  }
  function printSchemaDefinition(schema) {
    if (schema.description == null && isSchemaOfCommonNames(schema)) {
      return;
    }
    const operationTypes = [];
    const queryType = schema.getQueryType();
    if (queryType) {
      operationTypes.push(`  query: ${queryType.name}`);
    }
    const mutationType = schema.getMutationType();
    if (mutationType) {
      operationTypes.push(`  mutation: ${mutationType.name}`);
    }
    const subscriptionType = schema.getSubscriptionType();
    if (subscriptionType) {
      operationTypes.push(`  subscription: ${subscriptionType.name}`);
    }
    return printDescription(schema) + `schema {
${operationTypes.join(`
`)}
}`;
  }
  function isSchemaOfCommonNames(schema) {
    const queryType = schema.getQueryType();
    if (queryType && queryType.name !== "Query") {
      return false;
    }
    const mutationType = schema.getMutationType();
    if (mutationType && mutationType.name !== "Mutation") {
      return false;
    }
    const subscriptionType = schema.getSubscriptionType();
    if (subscriptionType && subscriptionType.name !== "Subscription") {
      return false;
    }
    return true;
  }
  function printType(type) {
    if ((0, _definition.isScalarType)(type)) {
      return printScalar(type);
    }
    if ((0, _definition.isObjectType)(type)) {
      return printObject(type);
    }
    if ((0, _definition.isInterfaceType)(type)) {
      return printInterface(type);
    }
    if ((0, _definition.isUnionType)(type)) {
      return printUnion(type);
    }
    if ((0, _definition.isEnumType)(type)) {
      return printEnum(type);
    }
    if ((0, _definition.isInputObjectType)(type)) {
      return printInputObject(type);
    }
    (0, _invariant.invariant)(false, "Unexpected type: " + (0, _inspect.inspect)(type));
  }
  function printScalar(type) {
    return printDescription(type) + `scalar ${type.name}` + printSpecifiedByURL(type);
  }
  function printImplementedInterfaces(type) {
    const interfaces = type.getInterfaces();
    return interfaces.length ? " implements " + interfaces.map((i) => i.name).join(" & ") : "";
  }
  function printObject(type) {
    return printDescription(type) + `type ${type.name}` + printImplementedInterfaces(type) + printFields(type);
  }
  function printInterface(type) {
    return printDescription(type) + `interface ${type.name}` + printImplementedInterfaces(type) + printFields(type);
  }
  function printUnion(type) {
    const types2 = type.getTypes();
    const possibleTypes = types2.length ? " = " + types2.join(" | ") : "";
    return printDescription(type) + "union " + type.name + possibleTypes;
  }
  function printEnum(type) {
    const values = type.getValues().map((value, i) => printDescription(value, "  ", !i) + "  " + value.name + printDeprecated(value.deprecationReason));
    return printDescription(type) + `enum ${type.name}` + printBlock(values);
  }
  function printInputObject(type) {
    const fields = Object.values(type.getFields()).map((f, i) => printDescription(f, "  ", !i) + "  " + printInputValue(f));
    return printDescription(type) + `input ${type.name}` + (type.isOneOf ? " @oneOf" : "") + printBlock(fields);
  }
  function printFields(type) {
    const fields = Object.values(type.getFields()).map((f, i) => printDescription(f, "  ", !i) + "  " + f.name + printArgs(f.args, "  ") + ": " + String(f.type) + printDeprecated(f.deprecationReason));
    return printBlock(fields);
  }
  function printBlock(items) {
    return items.length !== 0 ? ` {
` + items.join(`
`) + `
}` : "";
  }
  function printArgs(args, indentation = "") {
    if (args.length === 0) {
      return "";
    }
    if (args.every((arg) => !arg.description)) {
      return "(" + args.map(printInputValue).join(", ") + ")";
    }
    return `(
` + args.map((arg, i) => printDescription(arg, "  " + indentation, !i) + "  " + indentation + printInputValue(arg)).join(`
`) + `
` + indentation + ")";
  }
  function printInputValue(arg) {
    const defaultAST = (0, _astFromValue.astFromValue)(arg.defaultValue, arg.type);
    let argDecl = arg.name + ": " + String(arg.type);
    if (defaultAST) {
      argDecl += ` = ${(0, _printer.print)(defaultAST)}`;
    }
    return argDecl + printDeprecated(arg.deprecationReason);
  }
  function printDirective(directive) {
    return printDescription(directive) + "directive @" + directive.name + printArgs(directive.args) + (directive.isRepeatable ? " repeatable" : "") + " on " + directive.locations.join(" | ");
  }
  function printDeprecated(reason) {
    if (reason == null) {
      return "";
    }
    if (reason !== _directives.DEFAULT_DEPRECATION_REASON) {
      const astValue = (0, _printer.print)({
        kind: _kinds.Kind.STRING,
        value: reason
      });
      return ` @deprecated(reason: ${astValue})`;
    }
    return " @deprecated";
  }
  function printSpecifiedByURL(scalar) {
    if (scalar.specifiedByURL == null) {
      return "";
    }
    const astValue = (0, _printer.print)({
      kind: _kinds.Kind.STRING,
      value: scalar.specifiedByURL
    });
    return ` @specifiedBy(url: ${astValue})`;
  }
  function printDescription(def, indentation = "", firstInBlock = true) {
    const { description } = def;
    if (description == null) {
      return "";
    }
    const blockString = (0, _printer.print)({
      kind: _kinds.Kind.STRING,
      value: description,
      block: (0, _blockString.isPrintableAsBlockString)(description)
    });
    const prefix = indentation && !firstInBlock ? `
` + indentation : indentation;
    return prefix + blockString.replace(/\n/g, `
` + indentation) + `
`;
  }
});

// node_modules/graphql/utilities/concatAST.js
var require_concatAST = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.concatAST = concatAST;
  var _kinds = require_kinds();
  function concatAST(documents) {
    const definitions = [];
    for (const doc of documents) {
      definitions.push(...doc.definitions);
    }
    return {
      kind: _kinds.Kind.DOCUMENT,
      definitions
    };
  }
});

// node_modules/graphql/utilities/separateOperations.js
var require_separateOperations = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.separateOperations = separateOperations;
  var _kinds = require_kinds();
  var _visitor = require_visitor();
  function separateOperations(documentAST) {
    const operations = [];
    const depGraph = Object.create(null);
    for (const definitionNode of documentAST.definitions) {
      switch (definitionNode.kind) {
        case _kinds.Kind.OPERATION_DEFINITION:
          operations.push(definitionNode);
          break;
        case _kinds.Kind.FRAGMENT_DEFINITION:
          depGraph[definitionNode.name.value] = collectDependencies(definitionNode.selectionSet);
          break;
        default:
      }
    }
    const separatedDocumentASTs = Object.create(null);
    for (const operation of operations) {
      const dependencies = new Set;
      for (const fragmentName of collectDependencies(operation.selectionSet)) {
        collectTransitiveDependencies(dependencies, depGraph, fragmentName);
      }
      const operationName = operation.name ? operation.name.value : "";
      separatedDocumentASTs[operationName] = {
        kind: _kinds.Kind.DOCUMENT,
        definitions: documentAST.definitions.filter((node) => node === operation || node.kind === _kinds.Kind.FRAGMENT_DEFINITION && dependencies.has(node.name.value))
      };
    }
    return separatedDocumentASTs;
  }
  function collectTransitiveDependencies(collected, depGraph, fromName) {
    if (!collected.has(fromName)) {
      collected.add(fromName);
      const immediateDeps = depGraph[fromName];
      if (immediateDeps !== undefined) {
        for (const toName of immediateDeps) {
          collectTransitiveDependencies(collected, depGraph, toName);
        }
      }
    }
  }
  function collectDependencies(selectionSet) {
    const dependencies = [];
    (0, _visitor.visit)(selectionSet, {
      FragmentSpread(node) {
        dependencies.push(node.name.value);
      }
    });
    return dependencies;
  }
});

// node_modules/graphql/utilities/stripIgnoredCharacters.js
var require_stripIgnoredCharacters = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.stripIgnoredCharacters = stripIgnoredCharacters;
  var _blockString = require_blockString();
  var _lexer = require_lexer();
  var _source = require_source();
  var _tokenKind = require_tokenKind();
  function stripIgnoredCharacters(source) {
    const sourceObj = (0, _source.isSource)(source) ? source : new _source.Source(source);
    const body = sourceObj.body;
    const lexer = new _lexer.Lexer(sourceObj);
    let strippedBody = "";
    let wasLastAddedTokenNonPunctuator = false;
    while (lexer.advance().kind !== _tokenKind.TokenKind.EOF) {
      const currentToken = lexer.token;
      const tokenKind = currentToken.kind;
      const isNonPunctuator = !(0, _lexer.isPunctuatorTokenKind)(currentToken.kind);
      if (wasLastAddedTokenNonPunctuator) {
        if (isNonPunctuator || currentToken.kind === _tokenKind.TokenKind.SPREAD) {
          strippedBody += " ";
        }
      }
      const tokenBody = body.slice(currentToken.start, currentToken.end);
      if (tokenKind === _tokenKind.TokenKind.BLOCK_STRING) {
        strippedBody += (0, _blockString.printBlockString)(currentToken.value, {
          minimize: true
        });
      } else {
        strippedBody += tokenBody;
      }
      wasLastAddedTokenNonPunctuator = isNonPunctuator;
    }
    return strippedBody;
  }
});

// node_modules/graphql/utilities/assertValidName.js
var require_assertValidName = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.assertValidName = assertValidName;
  exports.isValidNameError = isValidNameError;
  var _devAssert = require_devAssert();
  var _GraphQLError = require_GraphQLError();
  var _assertName = require_assertName();
  function assertValidName(name) {
    const error = isValidNameError(name);
    if (error) {
      throw error;
    }
    return name;
  }
  function isValidNameError(name) {
    typeof name === "string" || (0, _devAssert.devAssert)(false, "Expected name to be a string.");
    if (name.startsWith("__")) {
      return new _GraphQLError.GraphQLError(`Name "${name}" must not begin with "__", which is reserved by GraphQL introspection.`);
    }
    try {
      (0, _assertName.assertName)(name);
    } catch (error) {
      return error;
    }
  }
});

// node_modules/graphql/utilities/findBreakingChanges.js
var require_findBreakingChanges = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DangerousChangeType = exports.BreakingChangeType = undefined;
  exports.findBreakingChanges = findBreakingChanges;
  exports.findDangerousChanges = findDangerousChanges;
  var _inspect = require_inspect();
  var _invariant = require_invariant();
  var _keyMap = require_keyMap();
  var _printer = require_printer();
  var _definition = require_definition();
  var _scalars = require_scalars();
  var _astFromValue = require_astFromValue();
  var _sortValueNode = require_sortValueNode();
  var BreakingChangeType;
  exports.BreakingChangeType = BreakingChangeType;
  (function(BreakingChangeType2) {
    BreakingChangeType2["TYPE_REMOVED"] = "TYPE_REMOVED";
    BreakingChangeType2["TYPE_CHANGED_KIND"] = "TYPE_CHANGED_KIND";
    BreakingChangeType2["TYPE_REMOVED_FROM_UNION"] = "TYPE_REMOVED_FROM_UNION";
    BreakingChangeType2["VALUE_REMOVED_FROM_ENUM"] = "VALUE_REMOVED_FROM_ENUM";
    BreakingChangeType2["REQUIRED_INPUT_FIELD_ADDED"] = "REQUIRED_INPUT_FIELD_ADDED";
    BreakingChangeType2["IMPLEMENTED_INTERFACE_REMOVED"] = "IMPLEMENTED_INTERFACE_REMOVED";
    BreakingChangeType2["FIELD_REMOVED"] = "FIELD_REMOVED";
    BreakingChangeType2["FIELD_CHANGED_KIND"] = "FIELD_CHANGED_KIND";
    BreakingChangeType2["REQUIRED_ARG_ADDED"] = "REQUIRED_ARG_ADDED";
    BreakingChangeType2["ARG_REMOVED"] = "ARG_REMOVED";
    BreakingChangeType2["ARG_CHANGED_KIND"] = "ARG_CHANGED_KIND";
    BreakingChangeType2["DIRECTIVE_REMOVED"] = "DIRECTIVE_REMOVED";
    BreakingChangeType2["DIRECTIVE_ARG_REMOVED"] = "DIRECTIVE_ARG_REMOVED";
    BreakingChangeType2["REQUIRED_DIRECTIVE_ARG_ADDED"] = "REQUIRED_DIRECTIVE_ARG_ADDED";
    BreakingChangeType2["DIRECTIVE_REPEATABLE_REMOVED"] = "DIRECTIVE_REPEATABLE_REMOVED";
    BreakingChangeType2["DIRECTIVE_LOCATION_REMOVED"] = "DIRECTIVE_LOCATION_REMOVED";
  })(BreakingChangeType || (exports.BreakingChangeType = BreakingChangeType = {}));
  var DangerousChangeType;
  exports.DangerousChangeType = DangerousChangeType;
  (function(DangerousChangeType2) {
    DangerousChangeType2["VALUE_ADDED_TO_ENUM"] = "VALUE_ADDED_TO_ENUM";
    DangerousChangeType2["TYPE_ADDED_TO_UNION"] = "TYPE_ADDED_TO_UNION";
    DangerousChangeType2["OPTIONAL_INPUT_FIELD_ADDED"] = "OPTIONAL_INPUT_FIELD_ADDED";
    DangerousChangeType2["OPTIONAL_ARG_ADDED"] = "OPTIONAL_ARG_ADDED";
    DangerousChangeType2["IMPLEMENTED_INTERFACE_ADDED"] = "IMPLEMENTED_INTERFACE_ADDED";
    DangerousChangeType2["ARG_DEFAULT_VALUE_CHANGE"] = "ARG_DEFAULT_VALUE_CHANGE";
  })(DangerousChangeType || (exports.DangerousChangeType = DangerousChangeType = {}));
  function findBreakingChanges(oldSchema, newSchema) {
    return findSchemaChanges(oldSchema, newSchema).filter((change) => (change.type in BreakingChangeType));
  }
  function findDangerousChanges(oldSchema, newSchema) {
    return findSchemaChanges(oldSchema, newSchema).filter((change) => (change.type in DangerousChangeType));
  }
  function findSchemaChanges(oldSchema, newSchema) {
    return [
      ...findTypeChanges(oldSchema, newSchema),
      ...findDirectiveChanges(oldSchema, newSchema)
    ];
  }
  function findDirectiveChanges(oldSchema, newSchema) {
    const schemaChanges = [];
    const directivesDiff = diff(oldSchema.getDirectives(), newSchema.getDirectives());
    for (const oldDirective of directivesDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.DIRECTIVE_REMOVED,
        description: `${oldDirective.name} was removed.`
      });
    }
    for (const [oldDirective, newDirective] of directivesDiff.persisted) {
      const argsDiff = diff(oldDirective.args, newDirective.args);
      for (const newArg of argsDiff.added) {
        if ((0, _definition.isRequiredArgument)(newArg)) {
          schemaChanges.push({
            type: BreakingChangeType.REQUIRED_DIRECTIVE_ARG_ADDED,
            description: `A required arg ${newArg.name} on directive ${oldDirective.name} was added.`
          });
        }
      }
      for (const oldArg of argsDiff.removed) {
        schemaChanges.push({
          type: BreakingChangeType.DIRECTIVE_ARG_REMOVED,
          description: `${oldArg.name} was removed from ${oldDirective.name}.`
        });
      }
      if (oldDirective.isRepeatable && !newDirective.isRepeatable) {
        schemaChanges.push({
          type: BreakingChangeType.DIRECTIVE_REPEATABLE_REMOVED,
          description: `Repeatable flag was removed from ${oldDirective.name}.`
        });
      }
      for (const location of oldDirective.locations) {
        if (!newDirective.locations.includes(location)) {
          schemaChanges.push({
            type: BreakingChangeType.DIRECTIVE_LOCATION_REMOVED,
            description: `${location} was removed from ${oldDirective.name}.`
          });
        }
      }
    }
    return schemaChanges;
  }
  function findTypeChanges(oldSchema, newSchema) {
    const schemaChanges = [];
    const typesDiff = diff(Object.values(oldSchema.getTypeMap()), Object.values(newSchema.getTypeMap()));
    for (const oldType of typesDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.TYPE_REMOVED,
        description: (0, _scalars.isSpecifiedScalarType)(oldType) ? `Standard scalar ${oldType.name} was removed because it is not referenced anymore.` : `${oldType.name} was removed.`
      });
    }
    for (const [oldType, newType] of typesDiff.persisted) {
      if ((0, _definition.isEnumType)(oldType) && (0, _definition.isEnumType)(newType)) {
        schemaChanges.push(...findEnumTypeChanges(oldType, newType));
      } else if ((0, _definition.isUnionType)(oldType) && (0, _definition.isUnionType)(newType)) {
        schemaChanges.push(...findUnionTypeChanges(oldType, newType));
      } else if ((0, _definition.isInputObjectType)(oldType) && (0, _definition.isInputObjectType)(newType)) {
        schemaChanges.push(...findInputObjectTypeChanges(oldType, newType));
      } else if ((0, _definition.isObjectType)(oldType) && (0, _definition.isObjectType)(newType)) {
        schemaChanges.push(...findFieldChanges(oldType, newType), ...findImplementedInterfacesChanges(oldType, newType));
      } else if ((0, _definition.isInterfaceType)(oldType) && (0, _definition.isInterfaceType)(newType)) {
        schemaChanges.push(...findFieldChanges(oldType, newType), ...findImplementedInterfacesChanges(oldType, newType));
      } else if (oldType.constructor !== newType.constructor) {
        schemaChanges.push({
          type: BreakingChangeType.TYPE_CHANGED_KIND,
          description: `${oldType.name} changed from ` + `${typeKindName(oldType)} to ${typeKindName(newType)}.`
        });
      }
    }
    return schemaChanges;
  }
  function findInputObjectTypeChanges(oldType, newType) {
    const schemaChanges = [];
    const fieldsDiff = diff(Object.values(oldType.getFields()), Object.values(newType.getFields()));
    for (const newField of fieldsDiff.added) {
      if ((0, _definition.isRequiredInputField)(newField)) {
        schemaChanges.push({
          type: BreakingChangeType.REQUIRED_INPUT_FIELD_ADDED,
          description: `A required field ${newField.name} on input type ${oldType.name} was added.`
        });
      } else {
        schemaChanges.push({
          type: DangerousChangeType.OPTIONAL_INPUT_FIELD_ADDED,
          description: `An optional field ${newField.name} on input type ${oldType.name} was added.`
        });
      }
    }
    for (const oldField of fieldsDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_REMOVED,
        description: `${oldType.name}.${oldField.name} was removed.`
      });
    }
    for (const [oldField, newField] of fieldsDiff.persisted) {
      const isSafe = isChangeSafeForInputObjectFieldOrFieldArg(oldField.type, newField.type);
      if (!isSafe) {
        schemaChanges.push({
          type: BreakingChangeType.FIELD_CHANGED_KIND,
          description: `${oldType.name}.${oldField.name} changed type from ` + `${String(oldField.type)} to ${String(newField.type)}.`
        });
      }
    }
    return schemaChanges;
  }
  function findUnionTypeChanges(oldType, newType) {
    const schemaChanges = [];
    const possibleTypesDiff = diff(oldType.getTypes(), newType.getTypes());
    for (const newPossibleType of possibleTypesDiff.added) {
      schemaChanges.push({
        type: DangerousChangeType.TYPE_ADDED_TO_UNION,
        description: `${newPossibleType.name} was added to union type ${oldType.name}.`
      });
    }
    for (const oldPossibleType of possibleTypesDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.TYPE_REMOVED_FROM_UNION,
        description: `${oldPossibleType.name} was removed from union type ${oldType.name}.`
      });
    }
    return schemaChanges;
  }
  function findEnumTypeChanges(oldType, newType) {
    const schemaChanges = [];
    const valuesDiff = diff(oldType.getValues(), newType.getValues());
    for (const newValue of valuesDiff.added) {
      schemaChanges.push({
        type: DangerousChangeType.VALUE_ADDED_TO_ENUM,
        description: `${newValue.name} was added to enum type ${oldType.name}.`
      });
    }
    for (const oldValue of valuesDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.VALUE_REMOVED_FROM_ENUM,
        description: `${oldValue.name} was removed from enum type ${oldType.name}.`
      });
    }
    return schemaChanges;
  }
  function findImplementedInterfacesChanges(oldType, newType) {
    const schemaChanges = [];
    const interfacesDiff = diff(oldType.getInterfaces(), newType.getInterfaces());
    for (const newInterface of interfacesDiff.added) {
      schemaChanges.push({
        type: DangerousChangeType.IMPLEMENTED_INTERFACE_ADDED,
        description: `${newInterface.name} added to interfaces implemented by ${oldType.name}.`
      });
    }
    for (const oldInterface of interfacesDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.IMPLEMENTED_INTERFACE_REMOVED,
        description: `${oldType.name} no longer implements interface ${oldInterface.name}.`
      });
    }
    return schemaChanges;
  }
  function findFieldChanges(oldType, newType) {
    const schemaChanges = [];
    const fieldsDiff = diff(Object.values(oldType.getFields()), Object.values(newType.getFields()));
    for (const oldField of fieldsDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.FIELD_REMOVED,
        description: `${oldType.name}.${oldField.name} was removed.`
      });
    }
    for (const [oldField, newField] of fieldsDiff.persisted) {
      schemaChanges.push(...findArgChanges(oldType, oldField, newField));
      const isSafe = isChangeSafeForObjectOrInterfaceField(oldField.type, newField.type);
      if (!isSafe) {
        schemaChanges.push({
          type: BreakingChangeType.FIELD_CHANGED_KIND,
          description: `${oldType.name}.${oldField.name} changed type from ` + `${String(oldField.type)} to ${String(newField.type)}.`
        });
      }
    }
    return schemaChanges;
  }
  function findArgChanges(oldType, oldField, newField) {
    const schemaChanges = [];
    const argsDiff = diff(oldField.args, newField.args);
    for (const oldArg of argsDiff.removed) {
      schemaChanges.push({
        type: BreakingChangeType.ARG_REMOVED,
        description: `${oldType.name}.${oldField.name} arg ${oldArg.name} was removed.`
      });
    }
    for (const [oldArg, newArg] of argsDiff.persisted) {
      const isSafe = isChangeSafeForInputObjectFieldOrFieldArg(oldArg.type, newArg.type);
      if (!isSafe) {
        schemaChanges.push({
          type: BreakingChangeType.ARG_CHANGED_KIND,
          description: `${oldType.name}.${oldField.name} arg ${oldArg.name} has changed type from ` + `${String(oldArg.type)} to ${String(newArg.type)}.`
        });
      } else if (oldArg.defaultValue !== undefined) {
        if (newArg.defaultValue === undefined) {
          schemaChanges.push({
            type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
            description: `${oldType.name}.${oldField.name} arg ${oldArg.name} defaultValue was removed.`
          });
        } else {
          const oldValueStr = stringifyValue(oldArg.defaultValue, oldArg.type);
          const newValueStr = stringifyValue(newArg.defaultValue, newArg.type);
          if (oldValueStr !== newValueStr) {
            schemaChanges.push({
              type: DangerousChangeType.ARG_DEFAULT_VALUE_CHANGE,
              description: `${oldType.name}.${oldField.name} arg ${oldArg.name} has changed defaultValue from ${oldValueStr} to ${newValueStr}.`
            });
          }
        }
      }
    }
    for (const newArg of argsDiff.added) {
      if ((0, _definition.isRequiredArgument)(newArg)) {
        schemaChanges.push({
          type: BreakingChangeType.REQUIRED_ARG_ADDED,
          description: `A required arg ${newArg.name} on ${oldType.name}.${oldField.name} was added.`
        });
      } else {
        schemaChanges.push({
          type: DangerousChangeType.OPTIONAL_ARG_ADDED,
          description: `An optional arg ${newArg.name} on ${oldType.name}.${oldField.name} was added.`
        });
      }
    }
    return schemaChanges;
  }
  function isChangeSafeForObjectOrInterfaceField(oldType, newType) {
    if ((0, _definition.isListType)(oldType)) {
      return (0, _definition.isListType)(newType) && isChangeSafeForObjectOrInterfaceField(oldType.ofType, newType.ofType) || (0, _definition.isNonNullType)(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType);
    }
    if ((0, _definition.isNonNullType)(oldType)) {
      return (0, _definition.isNonNullType)(newType) && isChangeSafeForObjectOrInterfaceField(oldType.ofType, newType.ofType);
    }
    return (0, _definition.isNamedType)(newType) && oldType.name === newType.name || (0, _definition.isNonNullType)(newType) && isChangeSafeForObjectOrInterfaceField(oldType, newType.ofType);
  }
  function isChangeSafeForInputObjectFieldOrFieldArg(oldType, newType) {
    if ((0, _definition.isListType)(oldType)) {
      return (0, _definition.isListType)(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType.ofType);
    }
    if ((0, _definition.isNonNullType)(oldType)) {
      return (0, _definition.isNonNullType)(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType.ofType) || !(0, _definition.isNonNullType)(newType) && isChangeSafeForInputObjectFieldOrFieldArg(oldType.ofType, newType);
    }
    return (0, _definition.isNamedType)(newType) && oldType.name === newType.name;
  }
  function typeKindName(type) {
    if ((0, _definition.isScalarType)(type)) {
      return "a Scalar type";
    }
    if ((0, _definition.isObjectType)(type)) {
      return "an Object type";
    }
    if ((0, _definition.isInterfaceType)(type)) {
      return "an Interface type";
    }
    if ((0, _definition.isUnionType)(type)) {
      return "a Union type";
    }
    if ((0, _definition.isEnumType)(type)) {
      return "an Enum type";
    }
    if ((0, _definition.isInputObjectType)(type)) {
      return "an Input type";
    }
    (0, _invariant.invariant)(false, "Unexpected type: " + (0, _inspect.inspect)(type));
  }
  function stringifyValue(value, type) {
    const ast = (0, _astFromValue.astFromValue)(value, type);
    ast != null || (0, _invariant.invariant)(false);
    return (0, _printer.print)((0, _sortValueNode.sortValueNode)(ast));
  }
  function diff(oldArray, newArray) {
    const added = [];
    const removed = [];
    const persisted = [];
    const oldMap = (0, _keyMap.keyMap)(oldArray, ({ name }) => name);
    const newMap = (0, _keyMap.keyMap)(newArray, ({ name }) => name);
    for (const oldItem of oldArray) {
      const newItem = newMap[oldItem.name];
      if (newItem === undefined) {
        removed.push(oldItem);
      } else {
        persisted.push([oldItem, newItem]);
      }
    }
    for (const newItem of newArray) {
      if (oldMap[newItem.name] === undefined) {
        added.push(newItem);
      }
    }
    return {
      added,
      persisted,
      removed
    };
  }
});

// node_modules/graphql/utilities/index.js
var require_utilities = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "BreakingChangeType", {
    enumerable: true,
    get: function() {
      return _findBreakingChanges.BreakingChangeType;
    }
  });
  Object.defineProperty(exports, "DangerousChangeType", {
    enumerable: true,
    get: function() {
      return _findBreakingChanges.DangerousChangeType;
    }
  });
  Object.defineProperty(exports, "TypeInfo", {
    enumerable: true,
    get: function() {
      return _TypeInfo.TypeInfo;
    }
  });
  Object.defineProperty(exports, "assertValidName", {
    enumerable: true,
    get: function() {
      return _assertValidName.assertValidName;
    }
  });
  Object.defineProperty(exports, "astFromValue", {
    enumerable: true,
    get: function() {
      return _astFromValue.astFromValue;
    }
  });
  Object.defineProperty(exports, "buildASTSchema", {
    enumerable: true,
    get: function() {
      return _buildASTSchema.buildASTSchema;
    }
  });
  Object.defineProperty(exports, "buildClientSchema", {
    enumerable: true,
    get: function() {
      return _buildClientSchema.buildClientSchema;
    }
  });
  Object.defineProperty(exports, "buildSchema", {
    enumerable: true,
    get: function() {
      return _buildASTSchema.buildSchema;
    }
  });
  Object.defineProperty(exports, "coerceInputValue", {
    enumerable: true,
    get: function() {
      return _coerceInputValue.coerceInputValue;
    }
  });
  Object.defineProperty(exports, "concatAST", {
    enumerable: true,
    get: function() {
      return _concatAST.concatAST;
    }
  });
  Object.defineProperty(exports, "doTypesOverlap", {
    enumerable: true,
    get: function() {
      return _typeComparators.doTypesOverlap;
    }
  });
  Object.defineProperty(exports, "extendSchema", {
    enumerable: true,
    get: function() {
      return _extendSchema.extendSchema;
    }
  });
  Object.defineProperty(exports, "findBreakingChanges", {
    enumerable: true,
    get: function() {
      return _findBreakingChanges.findBreakingChanges;
    }
  });
  Object.defineProperty(exports, "findDangerousChanges", {
    enumerable: true,
    get: function() {
      return _findBreakingChanges.findDangerousChanges;
    }
  });
  Object.defineProperty(exports, "getIntrospectionQuery", {
    enumerable: true,
    get: function() {
      return _getIntrospectionQuery.getIntrospectionQuery;
    }
  });
  Object.defineProperty(exports, "getOperationAST", {
    enumerable: true,
    get: function() {
      return _getOperationAST.getOperationAST;
    }
  });
  Object.defineProperty(exports, "getOperationRootType", {
    enumerable: true,
    get: function() {
      return _getOperationRootType.getOperationRootType;
    }
  });
  Object.defineProperty(exports, "introspectionFromSchema", {
    enumerable: true,
    get: function() {
      return _introspectionFromSchema.introspectionFromSchema;
    }
  });
  Object.defineProperty(exports, "isEqualType", {
    enumerable: true,
    get: function() {
      return _typeComparators.isEqualType;
    }
  });
  Object.defineProperty(exports, "isTypeSubTypeOf", {
    enumerable: true,
    get: function() {
      return _typeComparators.isTypeSubTypeOf;
    }
  });
  Object.defineProperty(exports, "isValidNameError", {
    enumerable: true,
    get: function() {
      return _assertValidName.isValidNameError;
    }
  });
  Object.defineProperty(exports, "lexicographicSortSchema", {
    enumerable: true,
    get: function() {
      return _lexicographicSortSchema.lexicographicSortSchema;
    }
  });
  Object.defineProperty(exports, "printIntrospectionSchema", {
    enumerable: true,
    get: function() {
      return _printSchema.printIntrospectionSchema;
    }
  });
  Object.defineProperty(exports, "printSchema", {
    enumerable: true,
    get: function() {
      return _printSchema.printSchema;
    }
  });
  Object.defineProperty(exports, "printType", {
    enumerable: true,
    get: function() {
      return _printSchema.printType;
    }
  });
  Object.defineProperty(exports, "separateOperations", {
    enumerable: true,
    get: function() {
      return _separateOperations.separateOperations;
    }
  });
  Object.defineProperty(exports, "stripIgnoredCharacters", {
    enumerable: true,
    get: function() {
      return _stripIgnoredCharacters.stripIgnoredCharacters;
    }
  });
  Object.defineProperty(exports, "typeFromAST", {
    enumerable: true,
    get: function() {
      return _typeFromAST.typeFromAST;
    }
  });
  Object.defineProperty(exports, "valueFromAST", {
    enumerable: true,
    get: function() {
      return _valueFromAST.valueFromAST;
    }
  });
  Object.defineProperty(exports, "valueFromASTUntyped", {
    enumerable: true,
    get: function() {
      return _valueFromASTUntyped.valueFromASTUntyped;
    }
  });
  Object.defineProperty(exports, "visitWithTypeInfo", {
    enumerable: true,
    get: function() {
      return _TypeInfo.visitWithTypeInfo;
    }
  });
  var _getIntrospectionQuery = require_getIntrospectionQuery();
  var _getOperationAST = require_getOperationAST();
  var _getOperationRootType = require_getOperationRootType();
  var _introspectionFromSchema = require_introspectionFromSchema();
  var _buildClientSchema = require_buildClientSchema();
  var _buildASTSchema = require_buildASTSchema();
  var _extendSchema = require_extendSchema();
  var _lexicographicSortSchema = require_lexicographicSortSchema();
  var _printSchema = require_printSchema();
  var _typeFromAST = require_typeFromAST();
  var _valueFromAST = require_valueFromAST();
  var _valueFromASTUntyped = require_valueFromASTUntyped();
  var _astFromValue = require_astFromValue();
  var _TypeInfo = require_TypeInfo();
  var _coerceInputValue = require_coerceInputValue();
  var _concatAST = require_concatAST();
  var _separateOperations = require_separateOperations();
  var _stripIgnoredCharacters = require_stripIgnoredCharacters();
  var _typeComparators = require_typeComparators();
  var _assertValidName = require_assertValidName();
  var _findBreakingChanges = require_findBreakingChanges();
});

// node_modules/graphql/index.js
var require_graphql2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "BREAK", {
    enumerable: true,
    get: function() {
      return _index2.BREAK;
    }
  });
  Object.defineProperty(exports, "BreakingChangeType", {
    enumerable: true,
    get: function() {
      return _index6.BreakingChangeType;
    }
  });
  Object.defineProperty(exports, "DEFAULT_DEPRECATION_REASON", {
    enumerable: true,
    get: function() {
      return _index.DEFAULT_DEPRECATION_REASON;
    }
  });
  Object.defineProperty(exports, "DangerousChangeType", {
    enumerable: true,
    get: function() {
      return _index6.DangerousChangeType;
    }
  });
  Object.defineProperty(exports, "DirectiveLocation", {
    enumerable: true,
    get: function() {
      return _index2.DirectiveLocation;
    }
  });
  Object.defineProperty(exports, "ExecutableDefinitionsRule", {
    enumerable: true,
    get: function() {
      return _index4.ExecutableDefinitionsRule;
    }
  });
  Object.defineProperty(exports, "FieldsOnCorrectTypeRule", {
    enumerable: true,
    get: function() {
      return _index4.FieldsOnCorrectTypeRule;
    }
  });
  Object.defineProperty(exports, "FragmentsOnCompositeTypesRule", {
    enumerable: true,
    get: function() {
      return _index4.FragmentsOnCompositeTypesRule;
    }
  });
  Object.defineProperty(exports, "GRAPHQL_MAX_INT", {
    enumerable: true,
    get: function() {
      return _index.GRAPHQL_MAX_INT;
    }
  });
  Object.defineProperty(exports, "GRAPHQL_MIN_INT", {
    enumerable: true,
    get: function() {
      return _index.GRAPHQL_MIN_INT;
    }
  });
  Object.defineProperty(exports, "GraphQLBoolean", {
    enumerable: true,
    get: function() {
      return _index.GraphQLBoolean;
    }
  });
  Object.defineProperty(exports, "GraphQLDeprecatedDirective", {
    enumerable: true,
    get: function() {
      return _index.GraphQLDeprecatedDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLDirective", {
    enumerable: true,
    get: function() {
      return _index.GraphQLDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLEnumType", {
    enumerable: true,
    get: function() {
      return _index.GraphQLEnumType;
    }
  });
  Object.defineProperty(exports, "GraphQLError", {
    enumerable: true,
    get: function() {
      return _index5.GraphQLError;
    }
  });
  Object.defineProperty(exports, "GraphQLFloat", {
    enumerable: true,
    get: function() {
      return _index.GraphQLFloat;
    }
  });
  Object.defineProperty(exports, "GraphQLID", {
    enumerable: true,
    get: function() {
      return _index.GraphQLID;
    }
  });
  Object.defineProperty(exports, "GraphQLIncludeDirective", {
    enumerable: true,
    get: function() {
      return _index.GraphQLIncludeDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLInputObjectType", {
    enumerable: true,
    get: function() {
      return _index.GraphQLInputObjectType;
    }
  });
  Object.defineProperty(exports, "GraphQLInt", {
    enumerable: true,
    get: function() {
      return _index.GraphQLInt;
    }
  });
  Object.defineProperty(exports, "GraphQLInterfaceType", {
    enumerable: true,
    get: function() {
      return _index.GraphQLInterfaceType;
    }
  });
  Object.defineProperty(exports, "GraphQLList", {
    enumerable: true,
    get: function() {
      return _index.GraphQLList;
    }
  });
  Object.defineProperty(exports, "GraphQLNonNull", {
    enumerable: true,
    get: function() {
      return _index.GraphQLNonNull;
    }
  });
  Object.defineProperty(exports, "GraphQLObjectType", {
    enumerable: true,
    get: function() {
      return _index.GraphQLObjectType;
    }
  });
  Object.defineProperty(exports, "GraphQLOneOfDirective", {
    enumerable: true,
    get: function() {
      return _index.GraphQLOneOfDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLScalarType", {
    enumerable: true,
    get: function() {
      return _index.GraphQLScalarType;
    }
  });
  Object.defineProperty(exports, "GraphQLSchema", {
    enumerable: true,
    get: function() {
      return _index.GraphQLSchema;
    }
  });
  Object.defineProperty(exports, "GraphQLSkipDirective", {
    enumerable: true,
    get: function() {
      return _index.GraphQLSkipDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLSpecifiedByDirective", {
    enumerable: true,
    get: function() {
      return _index.GraphQLSpecifiedByDirective;
    }
  });
  Object.defineProperty(exports, "GraphQLString", {
    enumerable: true,
    get: function() {
      return _index.GraphQLString;
    }
  });
  Object.defineProperty(exports, "GraphQLUnionType", {
    enumerable: true,
    get: function() {
      return _index.GraphQLUnionType;
    }
  });
  Object.defineProperty(exports, "Kind", {
    enumerable: true,
    get: function() {
      return _index2.Kind;
    }
  });
  Object.defineProperty(exports, "KnownArgumentNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.KnownArgumentNamesRule;
    }
  });
  Object.defineProperty(exports, "KnownDirectivesRule", {
    enumerable: true,
    get: function() {
      return _index4.KnownDirectivesRule;
    }
  });
  Object.defineProperty(exports, "KnownFragmentNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.KnownFragmentNamesRule;
    }
  });
  Object.defineProperty(exports, "KnownTypeNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.KnownTypeNamesRule;
    }
  });
  Object.defineProperty(exports, "Lexer", {
    enumerable: true,
    get: function() {
      return _index2.Lexer;
    }
  });
  Object.defineProperty(exports, "Location", {
    enumerable: true,
    get: function() {
      return _index2.Location;
    }
  });
  Object.defineProperty(exports, "LoneAnonymousOperationRule", {
    enumerable: true,
    get: function() {
      return _index4.LoneAnonymousOperationRule;
    }
  });
  Object.defineProperty(exports, "LoneSchemaDefinitionRule", {
    enumerable: true,
    get: function() {
      return _index4.LoneSchemaDefinitionRule;
    }
  });
  Object.defineProperty(exports, "MaxIntrospectionDepthRule", {
    enumerable: true,
    get: function() {
      return _index4.MaxIntrospectionDepthRule;
    }
  });
  Object.defineProperty(exports, "NoDeprecatedCustomRule", {
    enumerable: true,
    get: function() {
      return _index4.NoDeprecatedCustomRule;
    }
  });
  Object.defineProperty(exports, "NoFragmentCyclesRule", {
    enumerable: true,
    get: function() {
      return _index4.NoFragmentCyclesRule;
    }
  });
  Object.defineProperty(exports, "NoSchemaIntrospectionCustomRule", {
    enumerable: true,
    get: function() {
      return _index4.NoSchemaIntrospectionCustomRule;
    }
  });
  Object.defineProperty(exports, "NoUndefinedVariablesRule", {
    enumerable: true,
    get: function() {
      return _index4.NoUndefinedVariablesRule;
    }
  });
  Object.defineProperty(exports, "NoUnusedFragmentsRule", {
    enumerable: true,
    get: function() {
      return _index4.NoUnusedFragmentsRule;
    }
  });
  Object.defineProperty(exports, "NoUnusedVariablesRule", {
    enumerable: true,
    get: function() {
      return _index4.NoUnusedVariablesRule;
    }
  });
  Object.defineProperty(exports, "OperationTypeNode", {
    enumerable: true,
    get: function() {
      return _index2.OperationTypeNode;
    }
  });
  Object.defineProperty(exports, "OverlappingFieldsCanBeMergedRule", {
    enumerable: true,
    get: function() {
      return _index4.OverlappingFieldsCanBeMergedRule;
    }
  });
  Object.defineProperty(exports, "PossibleFragmentSpreadsRule", {
    enumerable: true,
    get: function() {
      return _index4.PossibleFragmentSpreadsRule;
    }
  });
  Object.defineProperty(exports, "PossibleTypeExtensionsRule", {
    enumerable: true,
    get: function() {
      return _index4.PossibleTypeExtensionsRule;
    }
  });
  Object.defineProperty(exports, "ProvidedRequiredArgumentsRule", {
    enumerable: true,
    get: function() {
      return _index4.ProvidedRequiredArgumentsRule;
    }
  });
  Object.defineProperty(exports, "ScalarLeafsRule", {
    enumerable: true,
    get: function() {
      return _index4.ScalarLeafsRule;
    }
  });
  Object.defineProperty(exports, "SchemaMetaFieldDef", {
    enumerable: true,
    get: function() {
      return _index.SchemaMetaFieldDef;
    }
  });
  Object.defineProperty(exports, "SingleFieldSubscriptionsRule", {
    enumerable: true,
    get: function() {
      return _index4.SingleFieldSubscriptionsRule;
    }
  });
  Object.defineProperty(exports, "Source", {
    enumerable: true,
    get: function() {
      return _index2.Source;
    }
  });
  Object.defineProperty(exports, "Token", {
    enumerable: true,
    get: function() {
      return _index2.Token;
    }
  });
  Object.defineProperty(exports, "TokenKind", {
    enumerable: true,
    get: function() {
      return _index2.TokenKind;
    }
  });
  Object.defineProperty(exports, "TypeInfo", {
    enumerable: true,
    get: function() {
      return _index6.TypeInfo;
    }
  });
  Object.defineProperty(exports, "TypeKind", {
    enumerable: true,
    get: function() {
      return _index.TypeKind;
    }
  });
  Object.defineProperty(exports, "TypeMetaFieldDef", {
    enumerable: true,
    get: function() {
      return _index.TypeMetaFieldDef;
    }
  });
  Object.defineProperty(exports, "TypeNameMetaFieldDef", {
    enumerable: true,
    get: function() {
      return _index.TypeNameMetaFieldDef;
    }
  });
  Object.defineProperty(exports, "UniqueArgumentDefinitionNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueArgumentDefinitionNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueArgumentNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueArgumentNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueDirectiveNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueDirectiveNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueDirectivesPerLocationRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueDirectivesPerLocationRule;
    }
  });
  Object.defineProperty(exports, "UniqueEnumValueNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueEnumValueNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueFieldDefinitionNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueFieldDefinitionNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueFragmentNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueFragmentNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueInputFieldNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueInputFieldNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueOperationNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueOperationNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueOperationTypesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueOperationTypesRule;
    }
  });
  Object.defineProperty(exports, "UniqueTypeNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueTypeNamesRule;
    }
  });
  Object.defineProperty(exports, "UniqueVariableNamesRule", {
    enumerable: true,
    get: function() {
      return _index4.UniqueVariableNamesRule;
    }
  });
  Object.defineProperty(exports, "ValidationContext", {
    enumerable: true,
    get: function() {
      return _index4.ValidationContext;
    }
  });
  Object.defineProperty(exports, "ValuesOfCorrectTypeRule", {
    enumerable: true,
    get: function() {
      return _index4.ValuesOfCorrectTypeRule;
    }
  });
  Object.defineProperty(exports, "VariablesAreInputTypesRule", {
    enumerable: true,
    get: function() {
      return _index4.VariablesAreInputTypesRule;
    }
  });
  Object.defineProperty(exports, "VariablesInAllowedPositionRule", {
    enumerable: true,
    get: function() {
      return _index4.VariablesInAllowedPositionRule;
    }
  });
  Object.defineProperty(exports, "__Directive", {
    enumerable: true,
    get: function() {
      return _index.__Directive;
    }
  });
  Object.defineProperty(exports, "__DirectiveLocation", {
    enumerable: true,
    get: function() {
      return _index.__DirectiveLocation;
    }
  });
  Object.defineProperty(exports, "__EnumValue", {
    enumerable: true,
    get: function() {
      return _index.__EnumValue;
    }
  });
  Object.defineProperty(exports, "__Field", {
    enumerable: true,
    get: function() {
      return _index.__Field;
    }
  });
  Object.defineProperty(exports, "__InputValue", {
    enumerable: true,
    get: function() {
      return _index.__InputValue;
    }
  });
  Object.defineProperty(exports, "__Schema", {
    enumerable: true,
    get: function() {
      return _index.__Schema;
    }
  });
  Object.defineProperty(exports, "__Type", {
    enumerable: true,
    get: function() {
      return _index.__Type;
    }
  });
  Object.defineProperty(exports, "__TypeKind", {
    enumerable: true,
    get: function() {
      return _index.__TypeKind;
    }
  });
  Object.defineProperty(exports, "assertAbstractType", {
    enumerable: true,
    get: function() {
      return _index.assertAbstractType;
    }
  });
  Object.defineProperty(exports, "assertCompositeType", {
    enumerable: true,
    get: function() {
      return _index.assertCompositeType;
    }
  });
  Object.defineProperty(exports, "assertDirective", {
    enumerable: true,
    get: function() {
      return _index.assertDirective;
    }
  });
  Object.defineProperty(exports, "assertEnumType", {
    enumerable: true,
    get: function() {
      return _index.assertEnumType;
    }
  });
  Object.defineProperty(exports, "assertEnumValueName", {
    enumerable: true,
    get: function() {
      return _index.assertEnumValueName;
    }
  });
  Object.defineProperty(exports, "assertInputObjectType", {
    enumerable: true,
    get: function() {
      return _index.assertInputObjectType;
    }
  });
  Object.defineProperty(exports, "assertInputType", {
    enumerable: true,
    get: function() {
      return _index.assertInputType;
    }
  });
  Object.defineProperty(exports, "assertInterfaceType", {
    enumerable: true,
    get: function() {
      return _index.assertInterfaceType;
    }
  });
  Object.defineProperty(exports, "assertLeafType", {
    enumerable: true,
    get: function() {
      return _index.assertLeafType;
    }
  });
  Object.defineProperty(exports, "assertListType", {
    enumerable: true,
    get: function() {
      return _index.assertListType;
    }
  });
  Object.defineProperty(exports, "assertName", {
    enumerable: true,
    get: function() {
      return _index.assertName;
    }
  });
  Object.defineProperty(exports, "assertNamedType", {
    enumerable: true,
    get: function() {
      return _index.assertNamedType;
    }
  });
  Object.defineProperty(exports, "assertNonNullType", {
    enumerable: true,
    get: function() {
      return _index.assertNonNullType;
    }
  });
  Object.defineProperty(exports, "assertNullableType", {
    enumerable: true,
    get: function() {
      return _index.assertNullableType;
    }
  });
  Object.defineProperty(exports, "assertObjectType", {
    enumerable: true,
    get: function() {
      return _index.assertObjectType;
    }
  });
  Object.defineProperty(exports, "assertOutputType", {
    enumerable: true,
    get: function() {
      return _index.assertOutputType;
    }
  });
  Object.defineProperty(exports, "assertScalarType", {
    enumerable: true,
    get: function() {
      return _index.assertScalarType;
    }
  });
  Object.defineProperty(exports, "assertSchema", {
    enumerable: true,
    get: function() {
      return _index.assertSchema;
    }
  });
  Object.defineProperty(exports, "assertType", {
    enumerable: true,
    get: function() {
      return _index.assertType;
    }
  });
  Object.defineProperty(exports, "assertUnionType", {
    enumerable: true,
    get: function() {
      return _index.assertUnionType;
    }
  });
  Object.defineProperty(exports, "assertValidName", {
    enumerable: true,
    get: function() {
      return _index6.assertValidName;
    }
  });
  Object.defineProperty(exports, "assertValidSchema", {
    enumerable: true,
    get: function() {
      return _index.assertValidSchema;
    }
  });
  Object.defineProperty(exports, "assertWrappingType", {
    enumerable: true,
    get: function() {
      return _index.assertWrappingType;
    }
  });
  Object.defineProperty(exports, "astFromValue", {
    enumerable: true,
    get: function() {
      return _index6.astFromValue;
    }
  });
  Object.defineProperty(exports, "buildASTSchema", {
    enumerable: true,
    get: function() {
      return _index6.buildASTSchema;
    }
  });
  Object.defineProperty(exports, "buildClientSchema", {
    enumerable: true,
    get: function() {
      return _index6.buildClientSchema;
    }
  });
  Object.defineProperty(exports, "buildSchema", {
    enumerable: true,
    get: function() {
      return _index6.buildSchema;
    }
  });
  Object.defineProperty(exports, "coerceInputValue", {
    enumerable: true,
    get: function() {
      return _index6.coerceInputValue;
    }
  });
  Object.defineProperty(exports, "concatAST", {
    enumerable: true,
    get: function() {
      return _index6.concatAST;
    }
  });
  Object.defineProperty(exports, "createSourceEventStream", {
    enumerable: true,
    get: function() {
      return _index3.createSourceEventStream;
    }
  });
  Object.defineProperty(exports, "defaultFieldResolver", {
    enumerable: true,
    get: function() {
      return _index3.defaultFieldResolver;
    }
  });
  Object.defineProperty(exports, "defaultTypeResolver", {
    enumerable: true,
    get: function() {
      return _index3.defaultTypeResolver;
    }
  });
  Object.defineProperty(exports, "doTypesOverlap", {
    enumerable: true,
    get: function() {
      return _index6.doTypesOverlap;
    }
  });
  Object.defineProperty(exports, "execute", {
    enumerable: true,
    get: function() {
      return _index3.execute;
    }
  });
  Object.defineProperty(exports, "executeSync", {
    enumerable: true,
    get: function() {
      return _index3.executeSync;
    }
  });
  Object.defineProperty(exports, "extendSchema", {
    enumerable: true,
    get: function() {
      return _index6.extendSchema;
    }
  });
  Object.defineProperty(exports, "findBreakingChanges", {
    enumerable: true,
    get: function() {
      return _index6.findBreakingChanges;
    }
  });
  Object.defineProperty(exports, "findDangerousChanges", {
    enumerable: true,
    get: function() {
      return _index6.findDangerousChanges;
    }
  });
  Object.defineProperty(exports, "formatError", {
    enumerable: true,
    get: function() {
      return _index5.formatError;
    }
  });
  Object.defineProperty(exports, "getArgumentValues", {
    enumerable: true,
    get: function() {
      return _index3.getArgumentValues;
    }
  });
  Object.defineProperty(exports, "getDirectiveValues", {
    enumerable: true,
    get: function() {
      return _index3.getDirectiveValues;
    }
  });
  Object.defineProperty(exports, "getEnterLeaveForKind", {
    enumerable: true,
    get: function() {
      return _index2.getEnterLeaveForKind;
    }
  });
  Object.defineProperty(exports, "getIntrospectionQuery", {
    enumerable: true,
    get: function() {
      return _index6.getIntrospectionQuery;
    }
  });
  Object.defineProperty(exports, "getLocation", {
    enumerable: true,
    get: function() {
      return _index2.getLocation;
    }
  });
  Object.defineProperty(exports, "getNamedType", {
    enumerable: true,
    get: function() {
      return _index.getNamedType;
    }
  });
  Object.defineProperty(exports, "getNullableType", {
    enumerable: true,
    get: function() {
      return _index.getNullableType;
    }
  });
  Object.defineProperty(exports, "getOperationAST", {
    enumerable: true,
    get: function() {
      return _index6.getOperationAST;
    }
  });
  Object.defineProperty(exports, "getOperationRootType", {
    enumerable: true,
    get: function() {
      return _index6.getOperationRootType;
    }
  });
  Object.defineProperty(exports, "getVariableValues", {
    enumerable: true,
    get: function() {
      return _index3.getVariableValues;
    }
  });
  Object.defineProperty(exports, "getVisitFn", {
    enumerable: true,
    get: function() {
      return _index2.getVisitFn;
    }
  });
  Object.defineProperty(exports, "graphql", {
    enumerable: true,
    get: function() {
      return _graphql.graphql;
    }
  });
  Object.defineProperty(exports, "graphqlSync", {
    enumerable: true,
    get: function() {
      return _graphql.graphqlSync;
    }
  });
  Object.defineProperty(exports, "introspectionFromSchema", {
    enumerable: true,
    get: function() {
      return _index6.introspectionFromSchema;
    }
  });
  Object.defineProperty(exports, "introspectionTypes", {
    enumerable: true,
    get: function() {
      return _index.introspectionTypes;
    }
  });
  Object.defineProperty(exports, "isAbstractType", {
    enumerable: true,
    get: function() {
      return _index.isAbstractType;
    }
  });
  Object.defineProperty(exports, "isCompositeType", {
    enumerable: true,
    get: function() {
      return _index.isCompositeType;
    }
  });
  Object.defineProperty(exports, "isConstValueNode", {
    enumerable: true,
    get: function() {
      return _index2.isConstValueNode;
    }
  });
  Object.defineProperty(exports, "isDefinitionNode", {
    enumerable: true,
    get: function() {
      return _index2.isDefinitionNode;
    }
  });
  Object.defineProperty(exports, "isDirective", {
    enumerable: true,
    get: function() {
      return _index.isDirective;
    }
  });
  Object.defineProperty(exports, "isEnumType", {
    enumerable: true,
    get: function() {
      return _index.isEnumType;
    }
  });
  Object.defineProperty(exports, "isEqualType", {
    enumerable: true,
    get: function() {
      return _index6.isEqualType;
    }
  });
  Object.defineProperty(exports, "isExecutableDefinitionNode", {
    enumerable: true,
    get: function() {
      return _index2.isExecutableDefinitionNode;
    }
  });
  Object.defineProperty(exports, "isInputObjectType", {
    enumerable: true,
    get: function() {
      return _index.isInputObjectType;
    }
  });
  Object.defineProperty(exports, "isInputType", {
    enumerable: true,
    get: function() {
      return _index.isInputType;
    }
  });
  Object.defineProperty(exports, "isInterfaceType", {
    enumerable: true,
    get: function() {
      return _index.isInterfaceType;
    }
  });
  Object.defineProperty(exports, "isIntrospectionType", {
    enumerable: true,
    get: function() {
      return _index.isIntrospectionType;
    }
  });
  Object.defineProperty(exports, "isLeafType", {
    enumerable: true,
    get: function() {
      return _index.isLeafType;
    }
  });
  Object.defineProperty(exports, "isListType", {
    enumerable: true,
    get: function() {
      return _index.isListType;
    }
  });
  Object.defineProperty(exports, "isNamedType", {
    enumerable: true,
    get: function() {
      return _index.isNamedType;
    }
  });
  Object.defineProperty(exports, "isNonNullType", {
    enumerable: true,
    get: function() {
      return _index.isNonNullType;
    }
  });
  Object.defineProperty(exports, "isNullableType", {
    enumerable: true,
    get: function() {
      return _index.isNullableType;
    }
  });
  Object.defineProperty(exports, "isObjectType", {
    enumerable: true,
    get: function() {
      return _index.isObjectType;
    }
  });
  Object.defineProperty(exports, "isOutputType", {
    enumerable: true,
    get: function() {
      return _index.isOutputType;
    }
  });
  Object.defineProperty(exports, "isRequiredArgument", {
    enumerable: true,
    get: function() {
      return _index.isRequiredArgument;
    }
  });
  Object.defineProperty(exports, "isRequiredInputField", {
    enumerable: true,
    get: function() {
      return _index.isRequiredInputField;
    }
  });
  Object.defineProperty(exports, "isScalarType", {
    enumerable: true,
    get: function() {
      return _index.isScalarType;
    }
  });
  Object.defineProperty(exports, "isSchema", {
    enumerable: true,
    get: function() {
      return _index.isSchema;
    }
  });
  Object.defineProperty(exports, "isSelectionNode", {
    enumerable: true,
    get: function() {
      return _index2.isSelectionNode;
    }
  });
  Object.defineProperty(exports, "isSpecifiedDirective", {
    enumerable: true,
    get: function() {
      return _index.isSpecifiedDirective;
    }
  });
  Object.defineProperty(exports, "isSpecifiedScalarType", {
    enumerable: true,
    get: function() {
      return _index.isSpecifiedScalarType;
    }
  });
  Object.defineProperty(exports, "isType", {
    enumerable: true,
    get: function() {
      return _index.isType;
    }
  });
  Object.defineProperty(exports, "isTypeDefinitionNode", {
    enumerable: true,
    get: function() {
      return _index2.isTypeDefinitionNode;
    }
  });
  Object.defineProperty(exports, "isTypeExtensionNode", {
    enumerable: true,
    get: function() {
      return _index2.isTypeExtensionNode;
    }
  });
  Object.defineProperty(exports, "isTypeNode", {
    enumerable: true,
    get: function() {
      return _index2.isTypeNode;
    }
  });
  Object.defineProperty(exports, "isTypeSubTypeOf", {
    enumerable: true,
    get: function() {
      return _index6.isTypeSubTypeOf;
    }
  });
  Object.defineProperty(exports, "isTypeSystemDefinitionNode", {
    enumerable: true,
    get: function() {
      return _index2.isTypeSystemDefinitionNode;
    }
  });
  Object.defineProperty(exports, "isTypeSystemExtensionNode", {
    enumerable: true,
    get: function() {
      return _index2.isTypeSystemExtensionNode;
    }
  });
  Object.defineProperty(exports, "isUnionType", {
    enumerable: true,
    get: function() {
      return _index.isUnionType;
    }
  });
  Object.defineProperty(exports, "isValidNameError", {
    enumerable: true,
    get: function() {
      return _index6.isValidNameError;
    }
  });
  Object.defineProperty(exports, "isValueNode", {
    enumerable: true,
    get: function() {
      return _index2.isValueNode;
    }
  });
  Object.defineProperty(exports, "isWrappingType", {
    enumerable: true,
    get: function() {
      return _index.isWrappingType;
    }
  });
  Object.defineProperty(exports, "lexicographicSortSchema", {
    enumerable: true,
    get: function() {
      return _index6.lexicographicSortSchema;
    }
  });
  Object.defineProperty(exports, "locatedError", {
    enumerable: true,
    get: function() {
      return _index5.locatedError;
    }
  });
  Object.defineProperty(exports, "parse", {
    enumerable: true,
    get: function() {
      return _index2.parse;
    }
  });
  Object.defineProperty(exports, "parseConstValue", {
    enumerable: true,
    get: function() {
      return _index2.parseConstValue;
    }
  });
  Object.defineProperty(exports, "parseType", {
    enumerable: true,
    get: function() {
      return _index2.parseType;
    }
  });
  Object.defineProperty(exports, "parseValue", {
    enumerable: true,
    get: function() {
      return _index2.parseValue;
    }
  });
  Object.defineProperty(exports, "print", {
    enumerable: true,
    get: function() {
      return _index2.print;
    }
  });
  Object.defineProperty(exports, "printError", {
    enumerable: true,
    get: function() {
      return _index5.printError;
    }
  });
  Object.defineProperty(exports, "printIntrospectionSchema", {
    enumerable: true,
    get: function() {
      return _index6.printIntrospectionSchema;
    }
  });
  Object.defineProperty(exports, "printLocation", {
    enumerable: true,
    get: function() {
      return _index2.printLocation;
    }
  });
  Object.defineProperty(exports, "printSchema", {
    enumerable: true,
    get: function() {
      return _index6.printSchema;
    }
  });
  Object.defineProperty(exports, "printSourceLocation", {
    enumerable: true,
    get: function() {
      return _index2.printSourceLocation;
    }
  });
  Object.defineProperty(exports, "printType", {
    enumerable: true,
    get: function() {
      return _index6.printType;
    }
  });
  Object.defineProperty(exports, "recommendedRules", {
    enumerable: true,
    get: function() {
      return _index4.recommendedRules;
    }
  });
  Object.defineProperty(exports, "resolveObjMapThunk", {
    enumerable: true,
    get: function() {
      return _index.resolveObjMapThunk;
    }
  });
  Object.defineProperty(exports, "resolveReadonlyArrayThunk", {
    enumerable: true,
    get: function() {
      return _index.resolveReadonlyArrayThunk;
    }
  });
  Object.defineProperty(exports, "responsePathAsArray", {
    enumerable: true,
    get: function() {
      return _index3.responsePathAsArray;
    }
  });
  Object.defineProperty(exports, "separateOperations", {
    enumerable: true,
    get: function() {
      return _index6.separateOperations;
    }
  });
  Object.defineProperty(exports, "specifiedDirectives", {
    enumerable: true,
    get: function() {
      return _index.specifiedDirectives;
    }
  });
  Object.defineProperty(exports, "specifiedRules", {
    enumerable: true,
    get: function() {
      return _index4.specifiedRules;
    }
  });
  Object.defineProperty(exports, "specifiedScalarTypes", {
    enumerable: true,
    get: function() {
      return _index.specifiedScalarTypes;
    }
  });
  Object.defineProperty(exports, "stripIgnoredCharacters", {
    enumerable: true,
    get: function() {
      return _index6.stripIgnoredCharacters;
    }
  });
  Object.defineProperty(exports, "subscribe", {
    enumerable: true,
    get: function() {
      return _index3.subscribe;
    }
  });
  Object.defineProperty(exports, "syntaxError", {
    enumerable: true,
    get: function() {
      return _index5.syntaxError;
    }
  });
  Object.defineProperty(exports, "typeFromAST", {
    enumerable: true,
    get: function() {
      return _index6.typeFromAST;
    }
  });
  Object.defineProperty(exports, "validate", {
    enumerable: true,
    get: function() {
      return _index4.validate;
    }
  });
  Object.defineProperty(exports, "validateSchema", {
    enumerable: true,
    get: function() {
      return _index.validateSchema;
    }
  });
  Object.defineProperty(exports, "valueFromAST", {
    enumerable: true,
    get: function() {
      return _index6.valueFromAST;
    }
  });
  Object.defineProperty(exports, "valueFromASTUntyped", {
    enumerable: true,
    get: function() {
      return _index6.valueFromASTUntyped;
    }
  });
  Object.defineProperty(exports, "version", {
    enumerable: true,
    get: function() {
      return _version.version;
    }
  });
  Object.defineProperty(exports, "versionInfo", {
    enumerable: true,
    get: function() {
      return _version.versionInfo;
    }
  });
  Object.defineProperty(exports, "visit", {
    enumerable: true,
    get: function() {
      return _index2.visit;
    }
  });
  Object.defineProperty(exports, "visitInParallel", {
    enumerable: true,
    get: function() {
      return _index2.visitInParallel;
    }
  });
  Object.defineProperty(exports, "visitWithTypeInfo", {
    enumerable: true,
    get: function() {
      return _index6.visitWithTypeInfo;
    }
  });
  var _version = require_version();
  var _graphql = require_graphql();
  var _index = require_type();
  var _index2 = require_language();
  var _index3 = require_execution();
  var _index4 = require_validation();
  var _index5 = require_error();
  var _index6 = require_utilities();
});

// node_modules/zod/dist/esm/v3/external.js
var exports_external = {};
__export(exports_external, {
  void: () => voidType,
  util: () => util,
  unknown: () => unknownType,
  union: () => unionType,
  undefined: () => undefinedType,
  tuple: () => tupleType,
  transformer: () => effectsType,
  symbol: () => symbolType,
  string: () => stringType,
  strictObject: () => strictObjectType,
  setErrorMap: () => setErrorMap,
  set: () => setType,
  record: () => recordType,
  quotelessJson: () => quotelessJson,
  promise: () => promiseType,
  preprocess: () => preprocessType,
  pipeline: () => pipelineType,
  ostring: () => ostring,
  optional: () => optionalType,
  onumber: () => onumber,
  oboolean: () => oboolean,
  objectUtil: () => objectUtil,
  object: () => objectType,
  number: () => numberType,
  nullable: () => nullableType,
  null: () => nullType,
  never: () => neverType,
  nativeEnum: () => nativeEnumType,
  nan: () => nanType,
  map: () => mapType,
  makeIssue: () => makeIssue,
  literal: () => literalType,
  lazy: () => lazyType,
  late: () => late,
  isValid: () => isValid,
  isDirty: () => isDirty,
  isAsync: () => isAsync,
  isAborted: () => isAborted,
  intersection: () => intersectionType,
  instanceof: () => instanceOfType,
  getParsedType: () => getParsedType,
  getErrorMap: () => getErrorMap,
  function: () => functionType,
  enum: () => enumType,
  effect: () => effectsType,
  discriminatedUnion: () => discriminatedUnionType,
  defaultErrorMap: () => en_default,
  datetimeRegex: () => datetimeRegex,
  date: () => dateType,
  custom: () => custom,
  coerce: () => coerce,
  boolean: () => booleanType,
  bigint: () => bigIntType,
  array: () => arrayType,
  any: () => anyType,
  addIssueToContext: () => addIssueToContext,
  ZodVoid: () => ZodVoid,
  ZodUnknown: () => ZodUnknown,
  ZodUnion: () => ZodUnion,
  ZodUndefined: () => ZodUndefined,
  ZodType: () => ZodType,
  ZodTuple: () => ZodTuple,
  ZodTransformer: () => ZodEffects,
  ZodSymbol: () => ZodSymbol,
  ZodString: () => ZodString,
  ZodSet: () => ZodSet,
  ZodSchema: () => ZodType,
  ZodRecord: () => ZodRecord,
  ZodReadonly: () => ZodReadonly,
  ZodPromise: () => ZodPromise,
  ZodPipeline: () => ZodPipeline,
  ZodParsedType: () => ZodParsedType,
  ZodOptional: () => ZodOptional,
  ZodObject: () => ZodObject,
  ZodNumber: () => ZodNumber,
  ZodNullable: () => ZodNullable,
  ZodNull: () => ZodNull,
  ZodNever: () => ZodNever,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNaN: () => ZodNaN,
  ZodMap: () => ZodMap,
  ZodLiteral: () => ZodLiteral,
  ZodLazy: () => ZodLazy,
  ZodIssueCode: () => ZodIssueCode,
  ZodIntersection: () => ZodIntersection,
  ZodFunction: () => ZodFunction,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodError: () => ZodError,
  ZodEnum: () => ZodEnum,
  ZodEffects: () => ZodEffects,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodDefault: () => ZodDefault,
  ZodDate: () => ZodDate,
  ZodCatch: () => ZodCatch,
  ZodBranded: () => ZodBranded,
  ZodBoolean: () => ZodBoolean,
  ZodBigInt: () => ZodBigInt,
  ZodArray: () => ZodArray,
  ZodAny: () => ZodAny,
  Schema: () => ZodType,
  ParseStatus: () => ParseStatus,
  OK: () => OK,
  NEVER: () => NEVER,
  INVALID: () => INVALID,
  EMPTY_PATH: () => EMPTY_PATH,
  DIRTY: () => DIRTY,
  BRAND: () => BRAND
});

// node_modules/zod/dist/esm/v3/helpers/util.js
var util;
(function(util2) {
  util2.assertEqual = (_) => {};
  function assertIs(_arg) {}
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error;
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
    };
  };
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
var getParsedType = (data) => {
  const t = typeof data;
  switch (t) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};

// node_modules/zod/dist/esm/v3/ZodError.js
var ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
var quotelessJson = (obj) => {
  const json = JSON.stringify(obj, null, 2);
  return json.replace(/"([^"]+)":/g, "$1:");
};

class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i = 0;
          while (i < issue.path.length) {
            const el = issue.path[i];
            const terminal = i === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
        fieldErrors[sub.path[0]].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};

// node_modules/zod/dist/esm/v3/locales/en.js
var errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
var en_default = errorMap;

// node_modules/zod/dist/esm/v3/errors.js
var overrideErrorMap = en_default;
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
// node_modules/zod/dist/esm/v3/helpers/parseUtil.js
var makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== undefined) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
var EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      ctx.schemaErrorMap,
      overrideMap,
      overrideMap === en_default ? undefined : en_default
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}

class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s of results) {
      if (s.status === "aborted")
        return INVALID;
      if (s.status === "dirty")
        status.dirty();
      arrayValue.push(s.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
var INVALID = Object.freeze({
  status: "aborted"
});
var DIRTY = (value) => ({ status: "dirty", value });
var OK = (value) => ({ status: "valid", value });
var isAborted = (x) => x.status === "aborted";
var isDirty = (x) => x.status === "dirty";
var isValid = (x) => x.status === "valid";
var isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
// node_modules/zod/dist/esm/v3/helpers/errorUtil.js
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
})(errorUtil || (errorUtil = {}));

// node_modules/zod/dist/esm/v3/types.js
var __classPrivateFieldGet = function(receiver, state, kind, f) {
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = function(receiver, state, value, kind, f) {
  if (kind === "m")
    throw new TypeError("Private method is not writable");
  if (kind === "a" && !f)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};
var _ZodEnum_cache;
var _ZodNativeEnum_cache;

class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
var handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}

class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus,
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: params?.async ?? false,
        contextualErrorMap: params?.errorMap
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if (err?.message?.toLowerCase()?.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params?.errorMap,
        async: true
      },
      path: params?.path || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(undefined).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
var cuidRegex = /^c[^\s-]{8,}$/i;
var cuid2Regex = /^[0-9a-z]+$/;
var ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
var uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
var nanoidRegex = /^[a-z0-9_-]{21}$/i;
var jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
var durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
var emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
var _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
var emojiRegex;
var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
var ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
var ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
var ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
var base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
var base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
var dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
var dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}

class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      offset: options?.offset ?? false,
      local: options?.local ?? false,
      ...errorUtil.errToObj(options?.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof options?.precision === "undefined" ? null : options?.precision,
      ...errorUtil.errToObj(options?.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options?.position,
      ...errorUtil.errToObj(options?.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}

class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};

class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = undefined;
    const status = new ParseStatus;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: params?.coerce ?? false,
    ...processCreateParams(params)
  });
};

class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: params?.coerce || false,
    ...processCreateParams(params)
  });
};

class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus;
    let ctx = undefined;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: params?.coerce || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};

class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};

class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};

class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};

class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};

class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};

class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};

class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};

class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : undefined,
          maximum: tooBig ? def.exactLength.value : undefined,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}

class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") {} else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== undefined ? {
        errorMap: (issue, ctx) => {
          const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  catchall(index) {
    return new ZodObject({
      ...this._def,
      catchall: index
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};

class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = undefined;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
var getDiscriminator = (type) => {
  if (type instanceof ZodLazy) {
    return getDiscriminator(type.schema);
  } else if (type instanceof ZodEffects) {
    return getDiscriminator(type.innerType());
  } else if (type instanceof ZodLiteral) {
    return [type.value];
  } else if (type instanceof ZodEnum) {
    return type.options;
  } else if (type instanceof ZodNativeEnum) {
    return util.objectValues(type.enum);
  } else if (type instanceof ZodDefault) {
    return getDiscriminator(type._def.innerType);
  } else if (type instanceof ZodUndefined) {
    return [undefined];
  } else if (type instanceof ZodNull) {
    return [null];
  } else if (type instanceof ZodOptional) {
    return [undefined, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodNullable) {
    return [null, ...getDiscriminator(type.unwrap())];
  } else if (type instanceof ZodBranded) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodReadonly) {
    return getDiscriminator(type.unwrap());
  } else if (type instanceof ZodCatch) {
    return getDiscriminator(type._def.innerType);
  } else {
    return [];
  }
};

class ZodDiscriminatedUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const discriminator = this.discriminator;
    const discriminatorValue = ctx.data[discriminator];
    const option = this.optionsMap.get(discriminatorValue);
    if (!option) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union_discriminator,
        options: Array.from(this.optionsMap.keys()),
        path: [discriminator]
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return option._parseAsync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    } else {
      return option._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
    }
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(discriminator, options, params) {
    const optionsMap = new Map;
    for (const type of options) {
      const discriminatorValues = getDiscriminator(type.shape[discriminator]);
      if (!discriminatorValues.length) {
        throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
      }
      for (const value of discriminatorValues) {
        if (optionsMap.has(value)) {
          throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
        }
        optionsMap.set(value, type);
      }
    }
    return new ZodDiscriminatedUnion({
      typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
      discriminator,
      options,
      optionsMap,
      ...processCreateParams(params)
    });
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0;index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}

class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};

class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};

class ZodRecord extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.object) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const pairs = [];
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    for (const key in ctx.data) {
      pairs.push({
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
        value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (ctx.common.async) {
      return ParseStatus.mergeObjectAsync(status, pairs);
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get element() {
    return this._def.valueType;
  }
  static create(first, second, third) {
    if (second instanceof ZodType) {
      return new ZodRecord({
        keyType: first,
        valueType: second,
        typeName: ZodFirstPartyTypeKind.ZodRecord,
        ...processCreateParams(third)
      });
    }
    return new ZodRecord({
      keyType: ZodString.create(),
      valueType: first,
      typeName: ZodFirstPartyTypeKind.ZodRecord,
      ...processCreateParams(second)
    });
  }
}

class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = new Map;
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = new Map;
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};

class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = new Set;
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};

class ZodFunction extends ZodType {
  constructor() {
    super(...arguments);
    this.validate = this.implement;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.function) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.function,
        received: ctx.parsedType
      });
      return INVALID;
    }
    function makeArgsIssue(args, error) {
      return makeIssue({
        data: args,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_arguments,
          argumentsError: error
        }
      });
    }
    function makeReturnsIssue(returns, error) {
      return makeIssue({
        data: returns,
        path: ctx.path,
        errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
        issueData: {
          code: ZodIssueCode.invalid_return_type,
          returnTypeError: error
        }
      });
    }
    const params = { errorMap: ctx.common.contextualErrorMap };
    const fn = ctx.data;
    if (this._def.returns instanceof ZodPromise) {
      const me = this;
      return OK(async function(...args) {
        const error = new ZodError([]);
        const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
          error.addIssue(makeArgsIssue(args, e));
          throw error;
        });
        const result = await Reflect.apply(fn, this, parsedArgs);
        const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
          error.addIssue(makeReturnsIssue(result, e));
          throw error;
        });
        return parsedReturns;
      });
    } else {
      const me = this;
      return OK(function(...args) {
        const parsedArgs = me._def.args.safeParse(args, params);
        if (!parsedArgs.success) {
          throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
        }
        const result = Reflect.apply(fn, this, parsedArgs.data);
        const parsedReturns = me._def.returns.safeParse(result, params);
        if (!parsedReturns.success) {
          throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
        }
        return parsedReturns.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...items) {
    return new ZodFunction({
      ...this._def,
      args: ZodTuple.create(items).rest(ZodUnknown.create())
    });
  }
  returns(returnType) {
    return new ZodFunction({
      ...this._def,
      returns: returnType
    });
  }
  implement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  strictImplement(func) {
    const validatedFunc = this.parse(func);
    return validatedFunc;
  }
  static create(args, returns, params) {
    return new ZodFunction({
      args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
      returns: returns || ZodUnknown.create(),
      typeName: ZodFirstPartyTypeKind.ZodFunction,
      ...processCreateParams(params)
    });
  }
}

class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};

class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}

class ZodEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodEnum_cache.set(this, undefined);
  }
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodEnum_cache, "f").has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
_ZodEnum_cache = new WeakMap;
ZodEnum.create = createZodEnum;

class ZodNativeEnum extends ZodType {
  constructor() {
    super(...arguments);
    _ZodNativeEnum_cache.set(this, undefined);
  }
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f")) {
      __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)), "f");
    }
    if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache, "f").has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
_ZodNativeEnum_cache = new WeakMap;
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};

class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};

class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return base;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return base;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(undefined);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};

class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};

class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};

class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};

class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
var BRAND = Symbol("zod_brand");

class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}

class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}

class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var late = {
  object: ZodObject.lazycreate
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (cls, params = {
  message: `Input not instance of ${cls.name}`
}) => custom((data) => data instanceof cls, params);
var stringType = ZodString.create;
var numberType = ZodNumber.create;
var nanType = ZodNaN.create;
var bigIntType = ZodBigInt.create;
var booleanType = ZodBoolean.create;
var dateType = ZodDate.create;
var symbolType = ZodSymbol.create;
var undefinedType = ZodUndefined.create;
var nullType = ZodNull.create;
var anyType = ZodAny.create;
var unknownType = ZodUnknown.create;
var neverType = ZodNever.create;
var voidType = ZodVoid.create;
var arrayType = ZodArray.create;
var objectType = ZodObject.create;
var strictObjectType = ZodObject.strictCreate;
var unionType = ZodUnion.create;
var discriminatedUnionType = ZodDiscriminatedUnion.create;
var intersectionType = ZodIntersection.create;
var tupleType = ZodTuple.create;
var recordType = ZodRecord.create;
var mapType = ZodMap.create;
var setType = ZodSet.create;
var functionType = ZodFunction.create;
var lazyType = ZodLazy.create;
var literalType = ZodLiteral.create;
var enumType = ZodEnum.create;
var nativeEnumType = ZodNativeEnum.create;
var promiseType = ZodPromise.create;
var effectsType = ZodEffects.create;
var optionalType = ZodOptional.create;
var nullableType = ZodNullable.create;
var preprocessType = ZodEffects.createWithPreprocess;
var pipelineType = ZodPipeline.create;
var ostring = () => stringType().optional();
var onumber = () => numberType().optional();
var oboolean = () => booleanType().optional();
var coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
var NEVER = INVALID;
// node_modules/@modelcontextprotocol/sdk/dist/esm/types.js
var LATEST_PROTOCOL_VERSION = "2025-03-26";
var SUPPORTED_PROTOCOL_VERSIONS = [
  LATEST_PROTOCOL_VERSION,
  "2024-11-05",
  "2024-10-07"
];
var JSONRPC_VERSION = "2.0";
var ProgressTokenSchema = exports_external.union([exports_external.string(), exports_external.number().int()]);
var CursorSchema = exports_external.string();
var RequestMetaSchema = exports_external.object({
  progressToken: exports_external.optional(ProgressTokenSchema)
}).passthrough();
var BaseRequestParamsSchema = exports_external.object({
  _meta: exports_external.optional(RequestMetaSchema)
}).passthrough();
var RequestSchema = exports_external.object({
  method: exports_external.string(),
  params: exports_external.optional(BaseRequestParamsSchema)
});
var BaseNotificationParamsSchema = exports_external.object({
  _meta: exports_external.optional(exports_external.object({}).passthrough())
}).passthrough();
var NotificationSchema = exports_external.object({
  method: exports_external.string(),
  params: exports_external.optional(BaseNotificationParamsSchema)
});
var ResultSchema = exports_external.object({
  _meta: exports_external.optional(exports_external.object({}).passthrough())
}).passthrough();
var RequestIdSchema = exports_external.union([exports_external.string(), exports_external.number().int()]);
var JSONRPCRequestSchema = exports_external.object({
  jsonrpc: exports_external.literal(JSONRPC_VERSION),
  id: RequestIdSchema
}).merge(RequestSchema).strict();
var isJSONRPCRequest = (value) => JSONRPCRequestSchema.safeParse(value).success;
var JSONRPCNotificationSchema = exports_external.object({
  jsonrpc: exports_external.literal(JSONRPC_VERSION)
}).merge(NotificationSchema).strict();
var isJSONRPCNotification = (value) => JSONRPCNotificationSchema.safeParse(value).success;
var JSONRPCResponseSchema = exports_external.object({
  jsonrpc: exports_external.literal(JSONRPC_VERSION),
  id: RequestIdSchema,
  result: ResultSchema
}).strict();
var isJSONRPCResponse = (value) => JSONRPCResponseSchema.safeParse(value).success;
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2[ErrorCode2["ConnectionClosed"] = -32000] = "ConnectionClosed";
  ErrorCode2[ErrorCode2["RequestTimeout"] = -32001] = "RequestTimeout";
  ErrorCode2[ErrorCode2["ParseError"] = -32700] = "ParseError";
  ErrorCode2[ErrorCode2["InvalidRequest"] = -32600] = "InvalidRequest";
  ErrorCode2[ErrorCode2["MethodNotFound"] = -32601] = "MethodNotFound";
  ErrorCode2[ErrorCode2["InvalidParams"] = -32602] = "InvalidParams";
  ErrorCode2[ErrorCode2["InternalError"] = -32603] = "InternalError";
})(ErrorCode || (ErrorCode = {}));
var JSONRPCErrorSchema = exports_external.object({
  jsonrpc: exports_external.literal(JSONRPC_VERSION),
  id: RequestIdSchema,
  error: exports_external.object({
    code: exports_external.number().int(),
    message: exports_external.string(),
    data: exports_external.optional(exports_external.unknown())
  })
}).strict();
var isJSONRPCError = (value) => JSONRPCErrorSchema.safeParse(value).success;
var JSONRPCMessageSchema = exports_external.union([
  JSONRPCRequestSchema,
  JSONRPCNotificationSchema,
  JSONRPCResponseSchema,
  JSONRPCErrorSchema
]);
var EmptyResultSchema = ResultSchema.strict();
var CancelledNotificationSchema = NotificationSchema.extend({
  method: exports_external.literal("notifications/cancelled"),
  params: BaseNotificationParamsSchema.extend({
    requestId: RequestIdSchema,
    reason: exports_external.string().optional()
  })
});
var ImplementationSchema = exports_external.object({
  name: exports_external.string(),
  version: exports_external.string()
}).passthrough();
var ClientCapabilitiesSchema = exports_external.object({
  experimental: exports_external.optional(exports_external.object({}).passthrough()),
  sampling: exports_external.optional(exports_external.object({}).passthrough()),
  roots: exports_external.optional(exports_external.object({
    listChanged: exports_external.optional(exports_external.boolean())
  }).passthrough())
}).passthrough();
var InitializeRequestSchema = RequestSchema.extend({
  method: exports_external.literal("initialize"),
  params: BaseRequestParamsSchema.extend({
    protocolVersion: exports_external.string(),
    capabilities: ClientCapabilitiesSchema,
    clientInfo: ImplementationSchema
  })
});
var ServerCapabilitiesSchema = exports_external.object({
  experimental: exports_external.optional(exports_external.object({}).passthrough()),
  logging: exports_external.optional(exports_external.object({}).passthrough()),
  completions: exports_external.optional(exports_external.object({}).passthrough()),
  prompts: exports_external.optional(exports_external.object({
    listChanged: exports_external.optional(exports_external.boolean())
  }).passthrough()),
  resources: exports_external.optional(exports_external.object({
    subscribe: exports_external.optional(exports_external.boolean()),
    listChanged: exports_external.optional(exports_external.boolean())
  }).passthrough()),
  tools: exports_external.optional(exports_external.object({
    listChanged: exports_external.optional(exports_external.boolean())
  }).passthrough())
}).passthrough();
var InitializeResultSchema = ResultSchema.extend({
  protocolVersion: exports_external.string(),
  capabilities: ServerCapabilitiesSchema,
  serverInfo: ImplementationSchema,
  instructions: exports_external.optional(exports_external.string())
});
var InitializedNotificationSchema = NotificationSchema.extend({
  method: exports_external.literal("notifications/initialized")
});
var PingRequestSchema = RequestSchema.extend({
  method: exports_external.literal("ping")
});
var ProgressSchema = exports_external.object({
  progress: exports_external.number(),
  total: exports_external.optional(exports_external.number()),
  message: exports_external.optional(exports_external.string())
}).passthrough();
var ProgressNotificationSchema = NotificationSchema.extend({
  method: exports_external.literal("notifications/progress"),
  params: BaseNotificationParamsSchema.merge(ProgressSchema).extend({
    progressToken: ProgressTokenSchema
  })
});
var PaginatedRequestSchema = RequestSchema.extend({
  params: BaseRequestParamsSchema.extend({
    cursor: exports_external.optional(CursorSchema)
  }).optional()
});
var PaginatedResultSchema = ResultSchema.extend({
  nextCursor: exports_external.optional(CursorSchema)
});
var ResourceContentsSchema = exports_external.object({
  uri: exports_external.string(),
  mimeType: exports_external.optional(exports_external.string())
}).passthrough();
var TextResourceContentsSchema = ResourceContentsSchema.extend({
  text: exports_external.string()
});
var BlobResourceContentsSchema = ResourceContentsSchema.extend({
  blob: exports_external.string().base64()
});
var ResourceSchema = exports_external.object({
  uri: exports_external.string(),
  name: exports_external.string(),
  description: exports_external.optional(exports_external.string()),
  mimeType: exports_external.optional(exports_external.string())
}).passthrough();
var ResourceTemplateSchema = exports_external.object({
  uriTemplate: exports_external.string(),
  name: exports_external.string(),
  description: exports_external.optional(exports_external.string()),
  mimeType: exports_external.optional(exports_external.string())
}).passthrough();
var ListResourcesRequestSchema = PaginatedRequestSchema.extend({
  method: exports_external.literal("resources/list")
});
var ListResourcesResultSchema = PaginatedResultSchema.extend({
  resources: exports_external.array(ResourceSchema)
});
var ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({
  method: exports_external.literal("resources/templates/list")
});
var ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({
  resourceTemplates: exports_external.array(ResourceTemplateSchema)
});
var ReadResourceRequestSchema = RequestSchema.extend({
  method: exports_external.literal("resources/read"),
  params: BaseRequestParamsSchema.extend({
    uri: exports_external.string()
  })
});
var ReadResourceResultSchema = ResultSchema.extend({
  contents: exports_external.array(exports_external.union([TextResourceContentsSchema, BlobResourceContentsSchema]))
});
var ResourceListChangedNotificationSchema = NotificationSchema.extend({
  method: exports_external.literal("notifications/resources/list_changed")
});
var SubscribeRequestSchema = RequestSchema.extend({
  method: exports_external.literal("resources/subscribe"),
  params: BaseRequestParamsSchema.extend({
    uri: exports_external.string()
  })
});
var UnsubscribeRequestSchema = RequestSchema.extend({
  method: exports_external.literal("resources/unsubscribe"),
  params: BaseRequestParamsSchema.extend({
    uri: exports_external.string()
  })
});
var ResourceUpdatedNotificationSchema = NotificationSchema.extend({
  method: exports_external.literal("notifications/resources/updated"),
  params: BaseNotificationParamsSchema.extend({
    uri: exports_external.string()
  })
});
var PromptArgumentSchema = exports_external.object({
  name: exports_external.string(),
  description: exports_external.optional(exports_external.string()),
  required: exports_external.optional(exports_external.boolean())
}).passthrough();
var PromptSchema = exports_external.object({
  name: exports_external.string(),
  description: exports_external.optional(exports_external.string()),
  arguments: exports_external.optional(exports_external.array(PromptArgumentSchema))
}).passthrough();
var ListPromptsRequestSchema = PaginatedRequestSchema.extend({
  method: exports_external.literal("prompts/list")
});
var ListPromptsResultSchema = PaginatedResultSchema.extend({
  prompts: exports_external.array(PromptSchema)
});
var GetPromptRequestSchema = RequestSchema.extend({
  method: exports_external.literal("prompts/get"),
  params: BaseRequestParamsSchema.extend({
    name: exports_external.string(),
    arguments: exports_external.optional(exports_external.record(exports_external.string()))
  })
});
var TextContentSchema = exports_external.object({
  type: exports_external.literal("text"),
  text: exports_external.string()
}).passthrough();
var ImageContentSchema = exports_external.object({
  type: exports_external.literal("image"),
  data: exports_external.string().base64(),
  mimeType: exports_external.string()
}).passthrough();
var AudioContentSchema = exports_external.object({
  type: exports_external.literal("audio"),
  data: exports_external.string().base64(),
  mimeType: exports_external.string()
}).passthrough();
var EmbeddedResourceSchema = exports_external.object({
  type: exports_external.literal("resource"),
  resource: exports_external.union([TextResourceContentsSchema, BlobResourceContentsSchema])
}).passthrough();
var PromptMessageSchema = exports_external.object({
  role: exports_external.enum(["user", "assistant"]),
  content: exports_external.union([
    TextContentSchema,
    ImageContentSchema,
    AudioContentSchema,
    EmbeddedResourceSchema
  ])
}).passthrough();
var GetPromptResultSchema = ResultSchema.extend({
  description: exports_external.optional(exports_external.string()),
  messages: exports_external.array(PromptMessageSchema)
});
var PromptListChangedNotificationSchema = NotificationSchema.extend({
  method: exports_external.literal("notifications/prompts/list_changed")
});
var ToolAnnotationsSchema = exports_external.object({
  title: exports_external.optional(exports_external.string()),
  readOnlyHint: exports_external.optional(exports_external.boolean()),
  destructiveHint: exports_external.optional(exports_external.boolean()),
  idempotentHint: exports_external.optional(exports_external.boolean()),
  openWorldHint: exports_external.optional(exports_external.boolean())
}).passthrough();
var ToolSchema = exports_external.object({
  name: exports_external.string(),
  description: exports_external.optional(exports_external.string()),
  inputSchema: exports_external.object({
    type: exports_external.literal("object"),
    properties: exports_external.optional(exports_external.object({}).passthrough()),
    required: exports_external.optional(exports_external.array(exports_external.string()))
  }).passthrough(),
  outputSchema: exports_external.optional(exports_external.object({
    type: exports_external.literal("object"),
    properties: exports_external.optional(exports_external.object({}).passthrough()),
    required: exports_external.optional(exports_external.array(exports_external.string()))
  }).passthrough()),
  annotations: exports_external.optional(ToolAnnotationsSchema)
}).passthrough();
var ListToolsRequestSchema = PaginatedRequestSchema.extend({
  method: exports_external.literal("tools/list")
});
var ListToolsResultSchema = PaginatedResultSchema.extend({
  tools: exports_external.array(ToolSchema)
});
var CallToolResultSchema = ResultSchema.extend({
  content: exports_external.array(exports_external.union([
    TextContentSchema,
    ImageContentSchema,
    AudioContentSchema,
    EmbeddedResourceSchema
  ])).default([]),
  structuredContent: exports_external.object({}).passthrough().optional(),
  isError: exports_external.optional(exports_external.boolean())
});
var CompatibilityCallToolResultSchema = CallToolResultSchema.or(ResultSchema.extend({
  toolResult: exports_external.unknown()
}));
var CallToolRequestSchema = RequestSchema.extend({
  method: exports_external.literal("tools/call"),
  params: BaseRequestParamsSchema.extend({
    name: exports_external.string(),
    arguments: exports_external.optional(exports_external.record(exports_external.unknown()))
  })
});
var ToolListChangedNotificationSchema = NotificationSchema.extend({
  method: exports_external.literal("notifications/tools/list_changed")
});
var LoggingLevelSchema = exports_external.enum([
  "debug",
  "info",
  "notice",
  "warning",
  "error",
  "critical",
  "alert",
  "emergency"
]);
var SetLevelRequestSchema = RequestSchema.extend({
  method: exports_external.literal("logging/setLevel"),
  params: BaseRequestParamsSchema.extend({
    level: LoggingLevelSchema
  })
});
var LoggingMessageNotificationSchema = NotificationSchema.extend({
  method: exports_external.literal("notifications/message"),
  params: BaseNotificationParamsSchema.extend({
    level: LoggingLevelSchema,
    logger: exports_external.optional(exports_external.string()),
    data: exports_external.unknown()
  })
});
var ModelHintSchema = exports_external.object({
  name: exports_external.string().optional()
}).passthrough();
var ModelPreferencesSchema = exports_external.object({
  hints: exports_external.optional(exports_external.array(ModelHintSchema)),
  costPriority: exports_external.optional(exports_external.number().min(0).max(1)),
  speedPriority: exports_external.optional(exports_external.number().min(0).max(1)),
  intelligencePriority: exports_external.optional(exports_external.number().min(0).max(1))
}).passthrough();
var SamplingMessageSchema = exports_external.object({
  role: exports_external.enum(["user", "assistant"]),
  content: exports_external.union([TextContentSchema, ImageContentSchema, AudioContentSchema])
}).passthrough();
var CreateMessageRequestSchema = RequestSchema.extend({
  method: exports_external.literal("sampling/createMessage"),
  params: BaseRequestParamsSchema.extend({
    messages: exports_external.array(SamplingMessageSchema),
    systemPrompt: exports_external.optional(exports_external.string()),
    includeContext: exports_external.optional(exports_external.enum(["none", "thisServer", "allServers"])),
    temperature: exports_external.optional(exports_external.number()),
    maxTokens: exports_external.number().int(),
    stopSequences: exports_external.optional(exports_external.array(exports_external.string())),
    metadata: exports_external.optional(exports_external.object({}).passthrough()),
    modelPreferences: exports_external.optional(ModelPreferencesSchema)
  })
});
var CreateMessageResultSchema = ResultSchema.extend({
  model: exports_external.string(),
  stopReason: exports_external.optional(exports_external.enum(["endTurn", "stopSequence", "maxTokens"]).or(exports_external.string())),
  role: exports_external.enum(["user", "assistant"]),
  content: exports_external.discriminatedUnion("type", [
    TextContentSchema,
    ImageContentSchema,
    AudioContentSchema
  ])
});
var ResourceReferenceSchema = exports_external.object({
  type: exports_external.literal("ref/resource"),
  uri: exports_external.string()
}).passthrough();
var PromptReferenceSchema = exports_external.object({
  type: exports_external.literal("ref/prompt"),
  name: exports_external.string()
}).passthrough();
var CompleteRequestSchema = RequestSchema.extend({
  method: exports_external.literal("completion/complete"),
  params: BaseRequestParamsSchema.extend({
    ref: exports_external.union([PromptReferenceSchema, ResourceReferenceSchema]),
    argument: exports_external.object({
      name: exports_external.string(),
      value: exports_external.string()
    }).passthrough()
  })
});
var CompleteResultSchema = ResultSchema.extend({
  completion: exports_external.object({
    values: exports_external.array(exports_external.string()).max(100),
    total: exports_external.optional(exports_external.number().int()),
    hasMore: exports_external.optional(exports_external.boolean())
  }).passthrough()
});
var RootSchema = exports_external.object({
  uri: exports_external.string().startsWith("file://"),
  name: exports_external.optional(exports_external.string())
}).passthrough();
var ListRootsRequestSchema = RequestSchema.extend({
  method: exports_external.literal("roots/list")
});
var ListRootsResultSchema = ResultSchema.extend({
  roots: exports_external.array(RootSchema)
});
var RootsListChangedNotificationSchema = NotificationSchema.extend({
  method: exports_external.literal("notifications/roots/list_changed")
});
var ClientRequestSchema = exports_external.union([
  PingRequestSchema,
  InitializeRequestSchema,
  CompleteRequestSchema,
  SetLevelRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  SubscribeRequestSchema,
  UnsubscribeRequestSchema,
  CallToolRequestSchema,
  ListToolsRequestSchema
]);
var ClientNotificationSchema = exports_external.union([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  InitializedNotificationSchema,
  RootsListChangedNotificationSchema
]);
var ClientResultSchema = exports_external.union([
  EmptyResultSchema,
  CreateMessageResultSchema,
  ListRootsResultSchema
]);
var ServerRequestSchema = exports_external.union([
  PingRequestSchema,
  CreateMessageRequestSchema,
  ListRootsRequestSchema
]);
var ServerNotificationSchema = exports_external.union([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  LoggingMessageNotificationSchema,
  ResourceUpdatedNotificationSchema,
  ResourceListChangedNotificationSchema,
  ToolListChangedNotificationSchema,
  PromptListChangedNotificationSchema
]);
var ServerResultSchema = exports_external.union([
  EmptyResultSchema,
  InitializeResultSchema,
  CompleteResultSchema,
  GetPromptResultSchema,
  ListPromptsResultSchema,
  ListResourcesResultSchema,
  ListResourceTemplatesResultSchema,
  ReadResourceResultSchema,
  CallToolResultSchema,
  ListToolsResultSchema
]);

class McpError extends Error {
  constructor(code, message, data) {
    super(`MCP error ${code}: ${message}`);
    this.code = code;
    this.data = data;
    this.name = "McpError";
  }
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/shared/protocol.js
var DEFAULT_REQUEST_TIMEOUT_MSEC = 60000;

class Protocol {
  constructor(_options) {
    this._options = _options;
    this._requestMessageId = 0;
    this._requestHandlers = new Map;
    this._requestHandlerAbortControllers = new Map;
    this._notificationHandlers = new Map;
    this._responseHandlers = new Map;
    this._progressHandlers = new Map;
    this._timeoutInfo = new Map;
    this.setNotificationHandler(CancelledNotificationSchema, (notification) => {
      const controller = this._requestHandlerAbortControllers.get(notification.params.requestId);
      controller === null || controller === undefined || controller.abort(notification.params.reason);
    });
    this.setNotificationHandler(ProgressNotificationSchema, (notification) => {
      this._onprogress(notification);
    });
    this.setRequestHandler(PingRequestSchema, (_request) => ({}));
  }
  _setupTimeout(messageId, timeout, maxTotalTimeout, onTimeout, resetTimeoutOnProgress = false) {
    this._timeoutInfo.set(messageId, {
      timeoutId: setTimeout(onTimeout, timeout),
      startTime: Date.now(),
      timeout,
      maxTotalTimeout,
      resetTimeoutOnProgress,
      onTimeout
    });
  }
  _resetTimeout(messageId) {
    const info = this._timeoutInfo.get(messageId);
    if (!info)
      return false;
    const totalElapsed = Date.now() - info.startTime;
    if (info.maxTotalTimeout && totalElapsed >= info.maxTotalTimeout) {
      this._timeoutInfo.delete(messageId);
      throw new McpError(ErrorCode.RequestTimeout, "Maximum total timeout exceeded", { maxTotalTimeout: info.maxTotalTimeout, totalElapsed });
    }
    clearTimeout(info.timeoutId);
    info.timeoutId = setTimeout(info.onTimeout, info.timeout);
    return true;
  }
  _cleanupTimeout(messageId) {
    const info = this._timeoutInfo.get(messageId);
    if (info) {
      clearTimeout(info.timeoutId);
      this._timeoutInfo.delete(messageId);
    }
  }
  async connect(transport) {
    this._transport = transport;
    this._transport.onclose = () => {
      this._onclose();
    };
    this._transport.onerror = (error) => {
      this._onerror(error);
    };
    this._transport.onmessage = (message, extra) => {
      if (isJSONRPCResponse(message) || isJSONRPCError(message)) {
        this._onresponse(message);
      } else if (isJSONRPCRequest(message)) {
        this._onrequest(message, extra);
      } else if (isJSONRPCNotification(message)) {
        this._onnotification(message);
      } else {
        this._onerror(new Error(`Unknown message type: ${JSON.stringify(message)}`));
      }
    };
    await this._transport.start();
  }
  _onclose() {
    var _a;
    const responseHandlers = this._responseHandlers;
    this._responseHandlers = new Map;
    this._progressHandlers.clear();
    this._transport = undefined;
    (_a = this.onclose) === null || _a === undefined || _a.call(this);
    const error = new McpError(ErrorCode.ConnectionClosed, "Connection closed");
    for (const handler of responseHandlers.values()) {
      handler(error);
    }
  }
  _onerror(error) {
    var _a;
    (_a = this.onerror) === null || _a === undefined || _a.call(this, error);
  }
  _onnotification(notification) {
    var _a;
    const handler = (_a = this._notificationHandlers.get(notification.method)) !== null && _a !== undefined ? _a : this.fallbackNotificationHandler;
    if (handler === undefined) {
      return;
    }
    Promise.resolve().then(() => handler(notification)).catch((error) => this._onerror(new Error(`Uncaught error in notification handler: ${error}`)));
  }
  _onrequest(request, extra) {
    var _a, _b, _c, _d;
    const handler = (_a = this._requestHandlers.get(request.method)) !== null && _a !== undefined ? _a : this.fallbackRequestHandler;
    if (handler === undefined) {
      (_b = this._transport) === null || _b === undefined || _b.send({
        jsonrpc: "2.0",
        id: request.id,
        error: {
          code: ErrorCode.MethodNotFound,
          message: "Method not found"
        }
      }).catch((error) => this._onerror(new Error(`Failed to send an error response: ${error}`)));
      return;
    }
    const abortController = new AbortController;
    this._requestHandlerAbortControllers.set(request.id, abortController);
    const fullExtra = {
      signal: abortController.signal,
      sessionId: (_c = this._transport) === null || _c === undefined ? undefined : _c.sessionId,
      _meta: (_d = request.params) === null || _d === undefined ? undefined : _d._meta,
      sendNotification: (notification) => this.notification(notification, { relatedRequestId: request.id }),
      sendRequest: (r, resultSchema, options) => this.request(r, resultSchema, { ...options, relatedRequestId: request.id }),
      authInfo: extra === null || extra === undefined ? undefined : extra.authInfo,
      requestId: request.id
    };
    Promise.resolve().then(() => handler(request, fullExtra)).then((result) => {
      var _a2;
      if (abortController.signal.aborted) {
        return;
      }
      return (_a2 = this._transport) === null || _a2 === undefined ? undefined : _a2.send({
        result,
        jsonrpc: "2.0",
        id: request.id
      });
    }, (error) => {
      var _a2, _b2;
      if (abortController.signal.aborted) {
        return;
      }
      return (_a2 = this._transport) === null || _a2 === undefined ? undefined : _a2.send({
        jsonrpc: "2.0",
        id: request.id,
        error: {
          code: Number.isSafeInteger(error["code"]) ? error["code"] : ErrorCode.InternalError,
          message: (_b2 = error.message) !== null && _b2 !== undefined ? _b2 : "Internal error"
        }
      });
    }).catch((error) => this._onerror(new Error(`Failed to send response: ${error}`))).finally(() => {
      this._requestHandlerAbortControllers.delete(request.id);
    });
  }
  _onprogress(notification) {
    const { progressToken, ...params } = notification.params;
    const messageId = Number(progressToken);
    const handler = this._progressHandlers.get(messageId);
    if (!handler) {
      this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(notification)}`));
      return;
    }
    const responseHandler = this._responseHandlers.get(messageId);
    const timeoutInfo = this._timeoutInfo.get(messageId);
    if (timeoutInfo && responseHandler && timeoutInfo.resetTimeoutOnProgress) {
      try {
        this._resetTimeout(messageId);
      } catch (error) {
        responseHandler(error);
        return;
      }
    }
    handler(params);
  }
  _onresponse(response) {
    const messageId = Number(response.id);
    const handler = this._responseHandlers.get(messageId);
    if (handler === undefined) {
      this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(response)}`));
      return;
    }
    this._responseHandlers.delete(messageId);
    this._progressHandlers.delete(messageId);
    this._cleanupTimeout(messageId);
    if (isJSONRPCResponse(response)) {
      handler(response);
    } else {
      const error = new McpError(response.error.code, response.error.message, response.error.data);
      handler(error);
    }
  }
  get transport() {
    return this._transport;
  }
  async close() {
    var _a;
    await ((_a = this._transport) === null || _a === undefined ? undefined : _a.close());
  }
  request(request, resultSchema, options) {
    const { relatedRequestId, resumptionToken, onresumptiontoken } = options !== null && options !== undefined ? options : {};
    return new Promise((resolve, reject) => {
      var _a, _b, _c, _d, _e;
      if (!this._transport) {
        reject(new Error("Not connected"));
        return;
      }
      if (((_a = this._options) === null || _a === undefined ? undefined : _a.enforceStrictCapabilities) === true) {
        this.assertCapabilityForMethod(request.method);
      }
      (_b = options === null || options === undefined ? undefined : options.signal) === null || _b === undefined || _b.throwIfAborted();
      const messageId = this._requestMessageId++;
      const jsonrpcRequest = {
        ...request,
        jsonrpc: "2.0",
        id: messageId
      };
      if (options === null || options === undefined ? undefined : options.onprogress) {
        this._progressHandlers.set(messageId, options.onprogress);
        jsonrpcRequest.params = {
          ...request.params,
          _meta: { progressToken: messageId }
        };
      }
      const cancel = (reason) => {
        var _a2;
        this._responseHandlers.delete(messageId);
        this._progressHandlers.delete(messageId);
        this._cleanupTimeout(messageId);
        (_a2 = this._transport) === null || _a2 === undefined || _a2.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: messageId,
            reason: String(reason)
          }
        }, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error) => this._onerror(new Error(`Failed to send cancellation: ${error}`)));
        reject(reason);
      };
      this._responseHandlers.set(messageId, (response) => {
        var _a2;
        if ((_a2 = options === null || options === undefined ? undefined : options.signal) === null || _a2 === undefined ? undefined : _a2.aborted) {
          return;
        }
        if (response instanceof Error) {
          return reject(response);
        }
        try {
          const result = resultSchema.parse(response.result);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      (_c = options === null || options === undefined ? undefined : options.signal) === null || _c === undefined || _c.addEventListener("abort", () => {
        var _a2;
        cancel((_a2 = options === null || options === undefined ? undefined : options.signal) === null || _a2 === undefined ? undefined : _a2.reason);
      });
      const timeout = (_d = options === null || options === undefined ? undefined : options.timeout) !== null && _d !== undefined ? _d : DEFAULT_REQUEST_TIMEOUT_MSEC;
      const timeoutHandler = () => cancel(new McpError(ErrorCode.RequestTimeout, "Request timed out", { timeout }));
      this._setupTimeout(messageId, timeout, options === null || options === undefined ? undefined : options.maxTotalTimeout, timeoutHandler, (_e = options === null || options === undefined ? undefined : options.resetTimeoutOnProgress) !== null && _e !== undefined ? _e : false);
      this._transport.send(jsonrpcRequest, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error) => {
        this._cleanupTimeout(messageId);
        reject(error);
      });
    });
  }
  async notification(notification, options) {
    if (!this._transport) {
      throw new Error("Not connected");
    }
    this.assertNotificationCapability(notification.method);
    const jsonrpcNotification = {
      ...notification,
      jsonrpc: "2.0"
    };
    await this._transport.send(jsonrpcNotification, options);
  }
  setRequestHandler(requestSchema, handler) {
    const method = requestSchema.shape.method.value;
    this.assertRequestHandlerCapability(method);
    this._requestHandlers.set(method, (request, extra) => {
      return Promise.resolve(handler(requestSchema.parse(request), extra));
    });
  }
  removeRequestHandler(method) {
    this._requestHandlers.delete(method);
  }
  assertCanSetRequestHandler(method) {
    if (this._requestHandlers.has(method)) {
      throw new Error(`A request handler for ${method} already exists, which would be overridden`);
    }
  }
  setNotificationHandler(notificationSchema, handler) {
    this._notificationHandlers.set(notificationSchema.shape.method.value, (notification) => Promise.resolve(handler(notificationSchema.parse(notification))));
  }
  removeNotificationHandler(method) {
    this._notificationHandlers.delete(method);
  }
}
function mergeCapabilities(base, additional) {
  return Object.entries(additional).reduce((acc, [key, value]) => {
    if (value && typeof value === "object") {
      acc[key] = acc[key] ? { ...acc[key], ...value } : value;
    } else {
      acc[key] = value;
    }
    return acc;
  }, { ...base });
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/index.js
class Server extends Protocol {
  constructor(_serverInfo, options) {
    var _a;
    super(options);
    this._serverInfo = _serverInfo;
    this._capabilities = (_a = options === null || options === undefined ? undefined : options.capabilities) !== null && _a !== undefined ? _a : {};
    this._instructions = options === null || options === undefined ? undefined : options.instructions;
    this.setRequestHandler(InitializeRequestSchema, (request) => this._oninitialize(request));
    this.setNotificationHandler(InitializedNotificationSchema, () => {
      var _a2;
      return (_a2 = this.oninitialized) === null || _a2 === undefined ? undefined : _a2.call(this);
    });
  }
  registerCapabilities(capabilities) {
    if (this.transport) {
      throw new Error("Cannot register capabilities after connecting to transport");
    }
    this._capabilities = mergeCapabilities(this._capabilities, capabilities);
  }
  assertCapabilityForMethod(method) {
    var _a, _b;
    switch (method) {
      case "sampling/createMessage":
        if (!((_a = this._clientCapabilities) === null || _a === undefined ? undefined : _a.sampling)) {
          throw new Error(`Client does not support sampling (required for ${method})`);
        }
        break;
      case "roots/list":
        if (!((_b = this._clientCapabilities) === null || _b === undefined ? undefined : _b.roots)) {
          throw new Error(`Client does not support listing roots (required for ${method})`);
        }
        break;
      case "ping":
        break;
    }
  }
  assertNotificationCapability(method) {
    switch (method) {
      case "notifications/message":
        if (!this._capabilities.logging) {
          throw new Error(`Server does not support logging (required for ${method})`);
        }
        break;
      case "notifications/resources/updated":
      case "notifications/resources/list_changed":
        if (!this._capabilities.resources) {
          throw new Error(`Server does not support notifying about resources (required for ${method})`);
        }
        break;
      case "notifications/tools/list_changed":
        if (!this._capabilities.tools) {
          throw new Error(`Server does not support notifying of tool list changes (required for ${method})`);
        }
        break;
      case "notifications/prompts/list_changed":
        if (!this._capabilities.prompts) {
          throw new Error(`Server does not support notifying of prompt list changes (required for ${method})`);
        }
        break;
      case "notifications/cancelled":
        break;
      case "notifications/progress":
        break;
    }
  }
  assertRequestHandlerCapability(method) {
    switch (method) {
      case "sampling/createMessage":
        if (!this._capabilities.sampling) {
          throw new Error(`Server does not support sampling (required for ${method})`);
        }
        break;
      case "logging/setLevel":
        if (!this._capabilities.logging) {
          throw new Error(`Server does not support logging (required for ${method})`);
        }
        break;
      case "prompts/get":
      case "prompts/list":
        if (!this._capabilities.prompts) {
          throw new Error(`Server does not support prompts (required for ${method})`);
        }
        break;
      case "resources/list":
      case "resources/templates/list":
      case "resources/read":
        if (!this._capabilities.resources) {
          throw new Error(`Server does not support resources (required for ${method})`);
        }
        break;
      case "tools/call":
      case "tools/list":
        if (!this._capabilities.tools) {
          throw new Error(`Server does not support tools (required for ${method})`);
        }
        break;
      case "ping":
      case "initialize":
        break;
    }
  }
  async _oninitialize(request) {
    const requestedVersion = request.params.protocolVersion;
    this._clientCapabilities = request.params.capabilities;
    this._clientVersion = request.params.clientInfo;
    return {
      protocolVersion: SUPPORTED_PROTOCOL_VERSIONS.includes(requestedVersion) ? requestedVersion : LATEST_PROTOCOL_VERSION,
      capabilities: this.getCapabilities(),
      serverInfo: this._serverInfo,
      ...this._instructions && { instructions: this._instructions }
    };
  }
  getClientCapabilities() {
    return this._clientCapabilities;
  }
  getClientVersion() {
    return this._clientVersion;
  }
  getCapabilities() {
    return this._capabilities;
  }
  async ping() {
    return this.request({ method: "ping" }, EmptyResultSchema);
  }
  async createMessage(params, options) {
    return this.request({ method: "sampling/createMessage", params }, CreateMessageResultSchema, options);
  }
  async listRoots(params, options) {
    return this.request({ method: "roots/list", params }, ListRootsResultSchema, options);
  }
  async sendLoggingMessage(params) {
    return this.notification({ method: "notifications/message", params });
  }
  async sendResourceUpdated(params) {
    return this.notification({
      method: "notifications/resources/updated",
      params
    });
  }
  async sendResourceListChanged() {
    return this.notification({
      method: "notifications/resources/list_changed"
    });
  }
  async sendToolListChanged() {
    return this.notification({ method: "notifications/tools/list_changed" });
  }
  async sendPromptListChanged() {
    return this.notification({ method: "notifications/prompts/list_changed" });
  }
}

// node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride = Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
  name: undefined,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: true,
  rejectedAdditionalProperties: false,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: false,
  definitions: {},
  errorMessages: false,
  markdownDescription: false,
  patternStrategy: "escape",
  applyRegexFlags: false,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref"
};
var getDefaultOptions = (options) => typeof options === "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
};
// node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs = (options) => {
  const _options = getDefaultOptions(options);
  const currentPath = _options.name !== undefined ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    currentPath,
    propertyPath: undefined,
    seen: new Map(Object.entries(_options.definitions).map(([name, def]) => [
      def._def,
      {
        def: def._def,
        path: [..._options.basePath, _options.definitionPath, name],
        jsonSchema: undefined
      }
    ]))
  };
};
// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key, errorMessage, refs) {
  if (!refs?.errorMessages)
    return;
  if (errorMessage) {
    res.errorMessage = {
      ...res.errorMessage,
      [key]: errorMessage
    };
  }
}
function setResponseValueAndErrors(res, key, value, errorMessage, refs) {
  res[key] = value;
  addErrorMessage(res, key, errorMessage, refs);
}
// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function parseArrayDef(def, refs) {
  const res = {
    type: "array"
  };
  if (def.type?._def && def.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny) {
    res.items = parseDef(def.type._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    });
  }
  if (def.minLength) {
    setResponseValueAndErrors(res, "minItems", def.minLength.value, def.minLength.message, refs);
  }
  if (def.maxLength) {
    setResponseValueAndErrors(res, "maxItems", def.maxLength.value, def.maxLength.message, refs);
  }
  if (def.exactLength) {
    setResponseValueAndErrors(res, "minItems", def.exactLength.value, def.exactLength.message, refs);
    setResponseValueAndErrors(res, "maxItems", def.exactLength.value, def.exactLength.message, refs);
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def, refs) {
  const res = {
    type: "integer",
    format: "int64"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def, refs, overrideDateStrategy) {
  const strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy)) {
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def, refs, item))
    };
  }
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def, refs);
  }
}
var integerDateParser = (def, refs) => {
  const res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3") {
    return res;
  }
  for (const check of def.checks) {
    switch (check.kind) {
      case "min":
        setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        break;
      case "max":
        setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        break;
    }
  }
  return res;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def) {
  return {
    type: "string",
    enum: Array.from(def.values)
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var isJsonSchema7AllOfType = (type) => {
  if ("type" in type && type.type === "string")
    return false;
  return "allOf" in type;
};
function parseIntersectionDef(def, refs) {
  const allOf = [
    parseDef(def.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x) => !!x);
  let unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: false } : undefined;
  const mergedAllOf = [];
  allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema)) {
      mergedAllOf.push(...schema.allOf);
      if (schema.unevaluatedProperties === undefined) {
        unevaluatedProperties = undefined;
      }
    } else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === false) {
        const { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else {
        unevaluatedProperties = undefined;
      }
      mergedAllOf.push(nestedSchema);
    }
  });
  return mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : undefined;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def, refs) {
  const parsedType = typeof def.value;
  if (parsedType !== "bigint" && parsedType !== "number" && parsedType !== "boolean" && parsedType !== "string") {
    return {
      type: Array.isArray(def.value) ? "array" : "object"
    };
  }
  if (refs.target === "openApi3") {
    return {
      type: parsedType === "bigint" ? "integer" : parsedType,
      enum: [def.value]
    };
  }
  return {
    type: parsedType === "bigint" ? "integer" : parsedType,
    const: def.value
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var emojiRegex2 = undefined;
var zodPatterns = {
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  emoji: () => {
    if (emojiRegex2 === undefined) {
      emojiRegex2 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u");
    }
    return emojiRegex2;
  },
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def, refs) {
  const res = {
    type: "string"
  };
  if (def.checks) {
    for (const check of def.checks) {
      switch (check.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check.message, refs);
              break;
            case "pattern:zod":
              addPattern(res, zodPatterns.email, check.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check.message, refs);
          break;
        case "regex":
          addPattern(res, check.regex, check.message, refs);
          break;
        case "cuid":
          addPattern(res, zodPatterns.cuid, check.message, refs);
          break;
        case "cuid2":
          addPattern(res, zodPatterns.cuid2, check.message, refs);
          break;
        case "startsWith":
          addPattern(res, RegExp(`^${escapeLiteralCheckValue(check.value, refs)}`), check.message, refs);
          break;
        case "endsWith":
          addPattern(res, RegExp(`${escapeLiteralCheckValue(check.value, refs)}$`), check.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check.message, refs);
          break;
        case "date":
          addFormat(res, "date", check.message, refs);
          break;
        case "time":
          addFormat(res, "time", check.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength === "number" ? Math.max(res.minLength, check.value) : check.value, check.message, refs);
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength === "number" ? Math.min(res.maxLength, check.value) : check.value, check.message, refs);
          break;
        case "includes": {
          addPattern(res, RegExp(escapeLiteralCheckValue(check.value, refs)), check.message, refs);
          break;
        }
        case "ip": {
          if (check.version !== "v6") {
            addFormat(res, "ipv4", check.message, refs);
          }
          if (check.version !== "v4") {
            addFormat(res, "ipv6", check.message, refs);
          }
          break;
        }
        case "base64url":
          addPattern(res, zodPatterns.base64url, check.message, refs);
          break;
        case "jwt":
          addPattern(res, zodPatterns.jwt, check.message, refs);
          break;
        case "cidr": {
          if (check.version !== "v6") {
            addPattern(res, zodPatterns.ipv4Cidr, check.message, refs);
          }
          if (check.version !== "v4") {
            addPattern(res, zodPatterns.ipv6Cidr, check.message, refs);
          }
          break;
        }
        case "emoji":
          addPattern(res, zodPatterns.emoji(), check.message, refs);
          break;
        case "ulid": {
          addPattern(res, zodPatterns.ulid, check.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern(res, zodPatterns.base64, check.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid": {
          addPattern(res, zodPatterns.nanoid, check.message, refs);
        }
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
          ((_) => {})(check);
      }
    }
  }
  return res;
}
function escapeLiteralCheckValue(literal, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal) : literal;
}
var ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source) {
  let result = "";
  for (let i = 0;i < source.length; i++) {
    if (!ALPHA_NUMERIC.has(source[i])) {
      result += "\\";
    }
    result += source[i];
  }
  return result;
}
function addFormat(schema, value, message, refs) {
  if (schema.format || schema.anyOf?.some((x) => x.format)) {
    if (!schema.anyOf) {
      schema.anyOf = [];
    }
    if (schema.format) {
      schema.anyOf.push({
        format: schema.format,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { format: schema.errorMessage.format }
        }
      });
      delete schema.format;
      if (schema.errorMessage) {
        delete schema.errorMessage.format;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.anyOf.push({
      format: value,
      ...message && refs.errorMessages && { errorMessage: { format: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "format", value, message, refs);
  }
}
function addPattern(schema, regex, message, refs) {
  if (schema.pattern || schema.allOf?.some((x) => x.pattern)) {
    if (!schema.allOf) {
      schema.allOf = [];
    }
    if (schema.pattern) {
      schema.allOf.push({
        pattern: schema.pattern,
        ...schema.errorMessage && refs.errorMessages && {
          errorMessage: { pattern: schema.errorMessage.pattern }
        }
      });
      delete schema.pattern;
      if (schema.errorMessage) {
        delete schema.errorMessage.pattern;
        if (Object.keys(schema.errorMessage).length === 0) {
          delete schema.errorMessage;
        }
      }
    }
    schema.allOf.push({
      pattern: stringifyRegExpWithFlags(regex, refs),
      ...message && refs.errorMessages && { errorMessage: { pattern: message } }
    });
  } else {
    setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message, refs);
  }
}
function stringifyRegExpWithFlags(regex, refs) {
  if (!refs.applyRegexFlags || !regex.flags) {
    return regex.source;
  }
  const flags = {
    i: regex.flags.includes("i"),
    m: regex.flags.includes("m"),
    s: regex.flags.includes("s")
  };
  const source = flags.i ? regex.source.toLowerCase() : regex.source;
  let pattern = "";
  let isEscaped = false;
  let inCharGroup = false;
  let inCharRange = false;
  for (let i = 0;i < source.length; i++) {
    if (isEscaped) {
      pattern += source[i];
      isEscaped = false;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source[i].match(/[a-z]/)) {
          if (inCharRange) {
            pattern += source[i];
            pattern += `${source[i - 2]}-${source[i]}`.toUpperCase();
            inCharRange = false;
          } else if (source[i + 1] === "-" && source[i + 2]?.match(/[a-z]/)) {
            pattern += source[i];
            inCharRange = true;
          } else {
            pattern += `${source[i]}${source[i].toUpperCase()}`;
          }
          continue;
        }
      } else if (source[i].match(/[a-z]/)) {
        pattern += `[${source[i]}${source[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source[i] === ".") {
      pattern += inCharGroup ? `${source[i]}\r
` : `[${source[i]}\r
]`;
      continue;
    }
    pattern += source[i];
    if (source[i] === "\\") {
      isEscaped = true;
    } else if (inCharGroup && source[i] === "]") {
      inCharGroup = false;
    } else if (!inCharGroup && source[i] === "[") {
      inCharGroup = true;
    }
  }
  try {
    new RegExp(pattern);
  } catch {
    console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`);
    return regex.source;
  }
  return pattern;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def, refs) {
  if (refs.target === "openAi") {
    console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead.");
  }
  if (refs.target === "openApi3" && def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      type: "object",
      required: def.keyType._def.values,
      properties: def.keyType._def.values.reduce((acc, key) => ({
        ...acc,
        [key]: parseDef(def.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key]
        }) ?? {}
      }), {}),
      additionalProperties: refs.rejectedAdditionalProperties
    };
  }
  const schema = {
    type: "object",
    additionalProperties: parseDef(def.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? refs.allowedAdditionalProperties
  };
  if (refs.target === "openApi3") {
    return schema;
  }
  if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.checks?.length) {
    const { type, ...keyType } = parseStringDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum) {
    return {
      ...schema,
      propertyNames: {
        enum: def.keyType._def.values
      }
    };
  } else if (def.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded && def.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && def.keyType._def.type._def.checks?.length) {
    const { type, ...keyType } = parseBrandedDef(def.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def, refs) {
  if (refs.mapStrategy === "record") {
    return parseRecordDef(def, refs);
  }
  const keys = parseDef(def.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || {};
  const values = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys, values],
      minItems: 2,
      maxItems: 2
    }
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def) {
  const object = def.values;
  const actualKeys = Object.keys(def.values).filter((key) => {
    return typeof object[object[key]] !== "number";
  });
  const actualValues = actualKeys.map((key) => object[key]);
  const parsedTypes = Array.from(new Set(actualValues.map((values) => typeof values)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: true
  } : {
    type: "null"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def, refs);
  const options = def.options instanceof Map ? Array.from(def.options.values()) : def.options;
  if (options.every((x) => (x._def.typeName in primitiveMappings) && (!x._def.checks || !x._def.checks.length))) {
    const types2 = options.reduce((types3, x) => {
      const type = primitiveMappings[x._def.typeName];
      return type && !types3.includes(type) ? [...types3, type] : types3;
    }, []);
    return {
      type: types2.length > 1 ? types2 : types2[0]
    };
  } else if (options.every((x) => x._def.typeName === "ZodLiteral" && !x.description)) {
    const types2 = options.reduce((acc, x) => {
      const type = typeof x._def.value;
      switch (type) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x._def.value === null)
            return [...acc, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return acc;
      }
    }, []);
    if (types2.length === options.length) {
      const uniqueTypes = types2.filter((x, i, a) => a.indexOf(x) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x) => {
          return acc.includes(x._def.value) ? acc : [...acc, x._def.value];
        }, [])
      };
    }
  } else if (options.every((x) => x._def.typeName === "ZodEnum")) {
    return {
      type: "string",
      enum: options.reduce((acc, x) => [
        ...acc,
        ...x._def.values.filter((x2) => !acc.includes(x2))
      ], [])
    };
  }
  return asAnyOf(def, refs);
}
var asAnyOf = (def, refs) => {
  const anyOf = (def.options instanceof Map ? Array.from(def.options.values()) : def.options).map((x, i) => parseDef(x._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i}`]
  })).filter((x) => !!x && (!refs.strictUnions || typeof x === "object" && Object.keys(x).length > 0));
  return anyOf.length ? { anyOf } : undefined;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def.innerType._def.typeName) && (!def.innerType._def.checks || !def.innerType._def.checks.length)) {
    if (refs.target === "openApi3") {
      return {
        type: primitiveMappings[def.innerType._def.typeName],
        nullable: true
      };
    }
    return {
      type: [
        primitiveMappings[def.innerType._def.typeName],
        "null"
      ]
    };
  }
  if (refs.target === "openApi3") {
    const base2 = parseDef(def.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    if (base2 && "$ref" in base2)
      return { allOf: [base2], nullable: true };
    return base2 && { ...base2, nullable: true };
  }
  const base = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def, refs) {
  const res = {
    type: "number"
  };
  if (!def.checks)
    return res;
  for (const check of def.checks) {
    switch (check.kind) {
      case "int":
        res.type = "integer";
        addErrorMessage(res, "type", check.message, refs);
        break;
      case "min":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMinimum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMinimum = true;
          }
          setResponseValueAndErrors(res, "minimum", check.value, check.message, refs);
        }
        break;
      case "max":
        if (refs.target === "jsonSchema7") {
          if (check.inclusive) {
            setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
          } else {
            setResponseValueAndErrors(res, "exclusiveMaximum", check.value, check.message, refs);
          }
        } else {
          if (!check.inclusive) {
            res.exclusiveMaximum = true;
          }
          setResponseValueAndErrors(res, "maximum", check.value, check.message, refs);
        }
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check.value, check.message, refs);
        break;
    }
  }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function parseObjectDef(def, refs) {
  const forceOptionalIntoNullable = refs.target === "openAi";
  const result = {
    type: "object",
    properties: {}
  };
  const required = [];
  const shape = def.shape();
  for (const propName in shape) {
    let propDef = shape[propName];
    if (propDef === undefined || propDef._def === undefined) {
      continue;
    }
    let propOptional = safeIsOptional(propDef);
    if (propOptional && forceOptionalIntoNullable) {
      if (propDef instanceof ZodOptional) {
        propDef = propDef._def.innerType;
      }
      if (!propDef.isNullable()) {
        propDef = propDef.nullable();
      }
      propOptional = false;
    }
    const parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    if (parsedDef === undefined) {
      continue;
    }
    result.properties[propName] = parsedDef;
    if (!propOptional) {
      required.push(propName);
    }
  }
  if (required.length) {
    result.required = required;
  }
  const additionalProperties = decideAdditionalProperties(def, refs);
  if (additionalProperties !== undefined) {
    result.additionalProperties = additionalProperties;
  }
  return result;
}
function decideAdditionalProperties(def, refs) {
  if (def.catchall._def.typeName !== "ZodNever") {
    return parseDef(def.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  }
  switch (def.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch {
    return true;
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef = (def, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString()) {
    return parseDef(def.innerType._def, refs);
  }
  const innerSchema = parseDef(def.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: {}
      },
      innerSchema
    ]
  } : {};
};

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef = (def, refs) => {
  if (refs.pipeStrategy === "input") {
    return parseDef(def.in._def, refs);
  } else if (refs.pipeStrategy === "output") {
    return parseDef(def.out._def, refs);
  }
  const a = parseDef(def.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  });
  const b = parseDef(def.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b].filter((x) => x !== undefined)
  };
};

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def, refs) {
  return parseDef(def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def, refs) {
  const items = parseDef(def.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  });
  const schema = {
    type: "array",
    uniqueItems: true,
    items
  };
  if (def.minSize) {
    setResponseValueAndErrors(schema, "minItems", def.minSize.value, def.minSize.message, refs);
  }
  if (def.maxSize) {
    setResponseValueAndErrors(schema, "maxItems", def.maxSize.value, def.maxSize.message, refs);
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def, refs) {
  if (def.rest) {
    return {
      type: "array",
      minItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === undefined ? acc : [...acc, x], []),
      additionalItems: parseDef(def.rest._def, {
        ...refs,
        currentPath: [...refs.currentPath, "additionalItems"]
      })
    };
  } else {
    return {
      type: "array",
      minItems: def.items.length,
      maxItems: def.items.length,
      items: def.items.map((x, i) => parseDef(x._def, {
        ...refs,
        currentPath: [...refs.currentPath, "items", `${i}`]
      })).reduce((acc, x) => x === undefined ? acc : [...acc, x], [])
    };
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef() {
  return {
    not: {}
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef() {
  return {};
}

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef = (def, refs) => {
  return parseDef(def.innerType._def, refs);
};

// node_modules/zod-to-json-schema/dist/esm/selectParser.js
var selectParser = (def, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def, refs);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef();
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def, refs);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return () => def.getter()._def;
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef();
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef();
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef();
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return;
    default:
      return ((_) => {
        return;
      })(typeName);
  }
};

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def, refs, forceResolution = false) {
  const seenItem = refs.seen.get(def);
  if (refs.override) {
    const overrideResult = refs.override?.(def, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride) {
      return overrideResult;
    }
  }
  if (seenItem && !forceResolution) {
    const seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== undefined) {
      return seenSchema;
    }
  }
  const newItem = { def, path: refs.currentPath, jsonSchema: undefined };
  refs.seen.set(def, newItem);
  const jsonSchemaOrGetter = selectParser(def, def.typeName, refs);
  const jsonSchema = typeof jsonSchemaOrGetter === "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema) {
    addMeta(def, refs, jsonSchema);
  }
  if (refs.postProcess) {
    const postProcessResult = refs.postProcess(jsonSchema, def, refs);
    newItem.jsonSchema = jsonSchema;
    return postProcessResult;
  }
  newItem.jsonSchema = jsonSchema;
  return jsonSchema;
}
var get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen": {
      if (item.path.length < refs.currentPath.length && item.path.every((value, index) => refs.currentPath[index] === value)) {
        console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`);
        return {};
      }
      return refs.$refStrategy === "seen" ? {} : undefined;
    }
  }
};
var getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (;i < pathA.length && i < pathB.length; i++) {
    if (pathA[i] !== pathB[i])
      break;
  }
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};
var addMeta = (def, refs, jsonSchema) => {
  if (def.description) {
    jsonSchema.description = def.description;
    if (refs.markdownDescription) {
      jsonSchema.markdownDescription = def.description;
    }
  }
  return jsonSchema;
};
// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema = (schema, options) => {
  const refs = getRefs(options);
  const definitions = typeof options === "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name2, schema2]) => ({
    ...acc,
    [name2]: parseDef(schema2._def, {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name2]
    }, true) ?? {}
  }), {}) : undefined;
  const name = typeof options === "string" ? options : options?.nameStrategy === "title" ? undefined : options?.name;
  const main = parseDef(schema._def, name === undefined ? refs : {
    ...refs,
    currentPath: [...refs.basePath, refs.definitionPath, name]
  }, false) ?? {};
  const title = typeof options === "object" && options.name !== undefined && options.nameStrategy === "title" ? options.name : undefined;
  if (title !== undefined) {
    main.title = title;
  }
  const combined = name === undefined ? definitions ? {
    ...main,
    [refs.definitionPath]: definitions
  } : main : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name]: main
    }
  };
  if (refs.target === "jsonSchema7") {
    combined.$schema = "http://json-schema.org/draft-07/schema#";
  } else if (refs.target === "jsonSchema2019-09" || refs.target === "openAi") {
    combined.$schema = "https://json-schema.org/draft/2019-09/schema#";
  }
  if (refs.target === "openAi" && (("anyOf" in combined) || ("oneOf" in combined) || ("allOf" in combined) || ("type" in combined) && Array.isArray(combined.type))) {
    console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property.");
  }
  return combined;
};
// node_modules/@modelcontextprotocol/sdk/dist/esm/server/completable.js
var McpZodTypeKind;
(function(McpZodTypeKind2) {
  McpZodTypeKind2["Completable"] = "McpCompletable";
})(McpZodTypeKind || (McpZodTypeKind = {}));

class Completable extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
Completable.create = (type, params) => {
  return new Completable({
    type,
    typeName: McpZodTypeKind.Completable,
    complete: params.complete,
    ...processCreateParams2(params)
  });
};
function processCreateParams2(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    var _a, _b;
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message !== null && message !== undefined ? message : ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: (_a = message !== null && message !== undefined ? message : required_error) !== null && _a !== undefined ? _a : ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: (_b = message !== null && message !== undefined ? message : invalid_type_error) !== null && _b !== undefined ? _b : ctx.defaultError };
  };
  return { errorMap: customMap, description };
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js
class McpServer {
  constructor(serverInfo, options) {
    this._registeredResources = {};
    this._registeredResourceTemplates = {};
    this._registeredTools = {};
    this._registeredPrompts = {};
    this._toolHandlersInitialized = false;
    this._completionHandlerInitialized = false;
    this._resourceHandlersInitialized = false;
    this._promptHandlersInitialized = false;
    this.server = new Server(serverInfo, options);
  }
  async connect(transport) {
    return await this.server.connect(transport);
  }
  async close() {
    await this.server.close();
  }
  setToolRequestHandlers() {
    if (this._toolHandlersInitialized) {
      return;
    }
    this.server.assertCanSetRequestHandler(ListToolsRequestSchema.shape.method.value);
    this.server.assertCanSetRequestHandler(CallToolRequestSchema.shape.method.value);
    this.server.registerCapabilities({
      tools: {
        listChanged: true
      }
    });
    this.server.setRequestHandler(ListToolsRequestSchema, () => ({
      tools: Object.entries(this._registeredTools).filter(([, tool]) => tool.enabled).map(([name, tool]) => {
        const toolDefinition = {
          name,
          description: tool.description,
          inputSchema: tool.inputSchema ? zodToJsonSchema(tool.inputSchema, {
            strictUnions: true
          }) : EMPTY_OBJECT_JSON_SCHEMA,
          annotations: tool.annotations
        };
        if (tool.outputSchema) {
          toolDefinition.outputSchema = zodToJsonSchema(tool.outputSchema, { strictUnions: true });
        }
        return toolDefinition;
      })
    }));
    this.server.setRequestHandler(CallToolRequestSchema, async (request, extra) => {
      const tool = this._registeredTools[request.params.name];
      if (!tool) {
        throw new McpError(ErrorCode.InvalidParams, `Tool ${request.params.name} not found`);
      }
      if (!tool.enabled) {
        throw new McpError(ErrorCode.InvalidParams, `Tool ${request.params.name} disabled`);
      }
      let result;
      if (tool.inputSchema) {
        const parseResult = await tool.inputSchema.safeParseAsync(request.params.arguments);
        if (!parseResult.success) {
          throw new McpError(ErrorCode.InvalidParams, `Invalid arguments for tool ${request.params.name}: ${parseResult.error.message}`);
        }
        const args = parseResult.data;
        const cb = tool.callback;
        try {
          result = await Promise.resolve(cb(args, extra));
        } catch (error) {
          result = {
            content: [
              {
                type: "text",
                text: error instanceof Error ? error.message : String(error)
              }
            ],
            isError: true
          };
        }
      } else {
        const cb = tool.callback;
        try {
          result = await Promise.resolve(cb(extra));
        } catch (error) {
          result = {
            content: [
              {
                type: "text",
                text: error instanceof Error ? error.message : String(error)
              }
            ],
            isError: true
          };
        }
      }
      if (tool.outputSchema) {
        if (!result.structuredContent) {
          throw new McpError(ErrorCode.InvalidParams, `Tool ${request.params.name} has an output schema but no structured content was provided`);
        }
        const parseResult = await tool.outputSchema.safeParseAsync(result.structuredContent);
        if (!parseResult.success) {
          throw new McpError(ErrorCode.InvalidParams, `Invalid structured content for tool ${request.params.name}: ${parseResult.error.message}`);
        }
      }
      return result;
    });
    this._toolHandlersInitialized = true;
  }
  setCompletionRequestHandler() {
    if (this._completionHandlerInitialized) {
      return;
    }
    this.server.assertCanSetRequestHandler(CompleteRequestSchema.shape.method.value);
    this.server.setRequestHandler(CompleteRequestSchema, async (request) => {
      switch (request.params.ref.type) {
        case "ref/prompt":
          return this.handlePromptCompletion(request, request.params.ref);
        case "ref/resource":
          return this.handleResourceCompletion(request, request.params.ref);
        default:
          throw new McpError(ErrorCode.InvalidParams, `Invalid completion reference: ${request.params.ref}`);
      }
    });
    this._completionHandlerInitialized = true;
  }
  async handlePromptCompletion(request, ref) {
    const prompt = this._registeredPrompts[ref.name];
    if (!prompt) {
      throw new McpError(ErrorCode.InvalidParams, `Prompt ${ref.name} not found`);
    }
    if (!prompt.enabled) {
      throw new McpError(ErrorCode.InvalidParams, `Prompt ${ref.name} disabled`);
    }
    if (!prompt.argsSchema) {
      return EMPTY_COMPLETION_RESULT;
    }
    const field = prompt.argsSchema.shape[request.params.argument.name];
    if (!(field instanceof Completable)) {
      return EMPTY_COMPLETION_RESULT;
    }
    const def = field._def;
    const suggestions = await def.complete(request.params.argument.value);
    return createCompletionResult(suggestions);
  }
  async handleResourceCompletion(request, ref) {
    const template = Object.values(this._registeredResourceTemplates).find((t) => t.resourceTemplate.uriTemplate.toString() === ref.uri);
    if (!template) {
      if (this._registeredResources[ref.uri]) {
        return EMPTY_COMPLETION_RESULT;
      }
      throw new McpError(ErrorCode.InvalidParams, `Resource template ${request.params.ref.uri} not found`);
    }
    const completer = template.resourceTemplate.completeCallback(request.params.argument.name);
    if (!completer) {
      return EMPTY_COMPLETION_RESULT;
    }
    const suggestions = await completer(request.params.argument.value);
    return createCompletionResult(suggestions);
  }
  setResourceRequestHandlers() {
    if (this._resourceHandlersInitialized) {
      return;
    }
    this.server.assertCanSetRequestHandler(ListResourcesRequestSchema.shape.method.value);
    this.server.assertCanSetRequestHandler(ListResourceTemplatesRequestSchema.shape.method.value);
    this.server.assertCanSetRequestHandler(ReadResourceRequestSchema.shape.method.value);
    this.server.registerCapabilities({
      resources: {
        listChanged: true
      }
    });
    this.server.setRequestHandler(ListResourcesRequestSchema, async (request, extra) => {
      const resources = Object.entries(this._registeredResources).filter(([_, resource]) => resource.enabled).map(([uri, resource]) => ({
        uri,
        name: resource.name,
        ...resource.metadata
      }));
      const templateResources = [];
      for (const template of Object.values(this._registeredResourceTemplates)) {
        if (!template.resourceTemplate.listCallback) {
          continue;
        }
        const result = await template.resourceTemplate.listCallback(extra);
        for (const resource of result.resources) {
          templateResources.push({
            ...resource,
            ...template.metadata
          });
        }
      }
      return { resources: [...resources, ...templateResources] };
    });
    this.server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => {
      const resourceTemplates = Object.entries(this._registeredResourceTemplates).map(([name, template]) => ({
        name,
        uriTemplate: template.resourceTemplate.uriTemplate.toString(),
        ...template.metadata
      }));
      return { resourceTemplates };
    });
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request, extra) => {
      const uri = new URL(request.params.uri);
      const resource = this._registeredResources[uri.toString()];
      if (resource) {
        if (!resource.enabled) {
          throw new McpError(ErrorCode.InvalidParams, `Resource ${uri} disabled`);
        }
        return resource.readCallback(uri, extra);
      }
      for (const template of Object.values(this._registeredResourceTemplates)) {
        const variables = template.resourceTemplate.uriTemplate.match(uri.toString());
        if (variables) {
          return template.readCallback(uri, variables, extra);
        }
      }
      throw new McpError(ErrorCode.InvalidParams, `Resource ${uri} not found`);
    });
    this.setCompletionRequestHandler();
    this._resourceHandlersInitialized = true;
  }
  setPromptRequestHandlers() {
    if (this._promptHandlersInitialized) {
      return;
    }
    this.server.assertCanSetRequestHandler(ListPromptsRequestSchema.shape.method.value);
    this.server.assertCanSetRequestHandler(GetPromptRequestSchema.shape.method.value);
    this.server.registerCapabilities({
      prompts: {
        listChanged: true
      }
    });
    this.server.setRequestHandler(ListPromptsRequestSchema, () => ({
      prompts: Object.entries(this._registeredPrompts).filter(([, prompt]) => prompt.enabled).map(([name, prompt]) => {
        return {
          name,
          description: prompt.description,
          arguments: prompt.argsSchema ? promptArgumentsFromSchema(prompt.argsSchema) : undefined
        };
      })
    }));
    this.server.setRequestHandler(GetPromptRequestSchema, async (request, extra) => {
      const prompt = this._registeredPrompts[request.params.name];
      if (!prompt) {
        throw new McpError(ErrorCode.InvalidParams, `Prompt ${request.params.name} not found`);
      }
      if (!prompt.enabled) {
        throw new McpError(ErrorCode.InvalidParams, `Prompt ${request.params.name} disabled`);
      }
      if (prompt.argsSchema) {
        const parseResult = await prompt.argsSchema.safeParseAsync(request.params.arguments);
        if (!parseResult.success) {
          throw new McpError(ErrorCode.InvalidParams, `Invalid arguments for prompt ${request.params.name}: ${parseResult.error.message}`);
        }
        const args = parseResult.data;
        const cb = prompt.callback;
        return await Promise.resolve(cb(args, extra));
      } else {
        const cb = prompt.callback;
        return await Promise.resolve(cb(extra));
      }
    });
    this.setCompletionRequestHandler();
    this._promptHandlersInitialized = true;
  }
  resource(name, uriOrTemplate, ...rest) {
    let metadata;
    if (typeof rest[0] === "object") {
      metadata = rest.shift();
    }
    const readCallback = rest[0];
    if (typeof uriOrTemplate === "string") {
      if (this._registeredResources[uriOrTemplate]) {
        throw new Error(`Resource ${uriOrTemplate} is already registered`);
      }
      const registeredResource = {
        name,
        metadata,
        readCallback,
        enabled: true,
        disable: () => registeredResource.update({ enabled: false }),
        enable: () => registeredResource.update({ enabled: true }),
        remove: () => registeredResource.update({ uri: null }),
        update: (updates) => {
          if (typeof updates.uri !== "undefined" && updates.uri !== uriOrTemplate) {
            delete this._registeredResources[uriOrTemplate];
            if (updates.uri)
              this._registeredResources[updates.uri] = registeredResource;
          }
          if (typeof updates.name !== "undefined")
            registeredResource.name = updates.name;
          if (typeof updates.metadata !== "undefined")
            registeredResource.metadata = updates.metadata;
          if (typeof updates.callback !== "undefined")
            registeredResource.readCallback = updates.callback;
          if (typeof updates.enabled !== "undefined")
            registeredResource.enabled = updates.enabled;
          this.sendResourceListChanged();
        }
      };
      this._registeredResources[uriOrTemplate] = registeredResource;
      this.setResourceRequestHandlers();
      this.sendResourceListChanged();
      return registeredResource;
    } else {
      if (this._registeredResourceTemplates[name]) {
        throw new Error(`Resource template ${name} is already registered`);
      }
      const registeredResourceTemplate = {
        resourceTemplate: uriOrTemplate,
        metadata,
        readCallback,
        enabled: true,
        disable: () => registeredResourceTemplate.update({ enabled: false }),
        enable: () => registeredResourceTemplate.update({ enabled: true }),
        remove: () => registeredResourceTemplate.update({ name: null }),
        update: (updates) => {
          if (typeof updates.name !== "undefined" && updates.name !== name) {
            delete this._registeredResourceTemplates[name];
            if (updates.name)
              this._registeredResourceTemplates[updates.name] = registeredResourceTemplate;
          }
          if (typeof updates.template !== "undefined")
            registeredResourceTemplate.resourceTemplate = updates.template;
          if (typeof updates.metadata !== "undefined")
            registeredResourceTemplate.metadata = updates.metadata;
          if (typeof updates.callback !== "undefined")
            registeredResourceTemplate.readCallback = updates.callback;
          if (typeof updates.enabled !== "undefined")
            registeredResourceTemplate.enabled = updates.enabled;
          this.sendResourceListChanged();
        }
      };
      this._registeredResourceTemplates[name] = registeredResourceTemplate;
      this.setResourceRequestHandlers();
      this.sendResourceListChanged();
      return registeredResourceTemplate;
    }
  }
  _createRegisteredTool(name, description, inputSchema, outputSchema, annotations, callback) {
    const registeredTool = {
      description,
      inputSchema: inputSchema === undefined ? undefined : exports_external.object(inputSchema),
      outputSchema: outputSchema === undefined ? undefined : exports_external.object(outputSchema),
      annotations,
      callback,
      enabled: true,
      disable: () => registeredTool.update({ enabled: false }),
      enable: () => registeredTool.update({ enabled: true }),
      remove: () => registeredTool.update({ name: null }),
      update: (updates) => {
        if (typeof updates.name !== "undefined" && updates.name !== name) {
          delete this._registeredTools[name];
          if (updates.name)
            this._registeredTools[updates.name] = registeredTool;
        }
        if (typeof updates.description !== "undefined")
          registeredTool.description = updates.description;
        if (typeof updates.paramsSchema !== "undefined")
          registeredTool.inputSchema = exports_external.object(updates.paramsSchema);
        if (typeof updates.callback !== "undefined")
          registeredTool.callback = updates.callback;
        if (typeof updates.annotations !== "undefined")
          registeredTool.annotations = updates.annotations;
        if (typeof updates.enabled !== "undefined")
          registeredTool.enabled = updates.enabled;
        this.sendToolListChanged();
      }
    };
    this._registeredTools[name] = registeredTool;
    this.setToolRequestHandlers();
    this.sendToolListChanged();
    return registeredTool;
  }
  tool(name, ...rest) {
    if (this._registeredTools[name]) {
      throw new Error(`Tool ${name} is already registered`);
    }
    let description;
    let inputSchema;
    let outputSchema;
    let annotations;
    if (typeof rest[0] === "string") {
      description = rest.shift();
    }
    if (rest.length > 1) {
      const firstArg = rest[0];
      if (isZodRawShape(firstArg)) {
        inputSchema = rest.shift();
        if (rest.length > 1 && typeof rest[0] === "object" && rest[0] !== null && !isZodRawShape(rest[0])) {
          annotations = rest.shift();
        }
      } else if (typeof firstArg === "object" && firstArg !== null) {
        annotations = rest.shift();
      }
    }
    const callback = rest[0];
    return this._createRegisteredTool(name, description, inputSchema, outputSchema, annotations, callback);
  }
  registerTool(name, config, cb) {
    if (this._registeredTools[name]) {
      throw new Error(`Tool ${name} is already registered`);
    }
    const { description, inputSchema, outputSchema, annotations } = config;
    return this._createRegisteredTool(name, description, inputSchema, outputSchema, annotations, cb);
  }
  prompt(name, ...rest) {
    if (this._registeredPrompts[name]) {
      throw new Error(`Prompt ${name} is already registered`);
    }
    let description;
    if (typeof rest[0] === "string") {
      description = rest.shift();
    }
    let argsSchema;
    if (rest.length > 1) {
      argsSchema = rest.shift();
    }
    const cb = rest[0];
    const registeredPrompt = {
      description,
      argsSchema: argsSchema === undefined ? undefined : exports_external.object(argsSchema),
      callback: cb,
      enabled: true,
      disable: () => registeredPrompt.update({ enabled: false }),
      enable: () => registeredPrompt.update({ enabled: true }),
      remove: () => registeredPrompt.update({ name: null }),
      update: (updates) => {
        if (typeof updates.name !== "undefined" && updates.name !== name) {
          delete this._registeredPrompts[name];
          if (updates.name)
            this._registeredPrompts[updates.name] = registeredPrompt;
        }
        if (typeof updates.description !== "undefined")
          registeredPrompt.description = updates.description;
        if (typeof updates.argsSchema !== "undefined")
          registeredPrompt.argsSchema = exports_external.object(updates.argsSchema);
        if (typeof updates.callback !== "undefined")
          registeredPrompt.callback = updates.callback;
        if (typeof updates.enabled !== "undefined")
          registeredPrompt.enabled = updates.enabled;
        this.sendPromptListChanged();
      }
    };
    this._registeredPrompts[name] = registeredPrompt;
    this.setPromptRequestHandlers();
    this.sendPromptListChanged();
    return registeredPrompt;
  }
  isConnected() {
    return this.server.transport !== undefined;
  }
  sendResourceListChanged() {
    if (this.isConnected()) {
      this.server.sendResourceListChanged();
    }
  }
  sendToolListChanged() {
    if (this.isConnected()) {
      this.server.sendToolListChanged();
    }
  }
  sendPromptListChanged() {
    if (this.isConnected()) {
      this.server.sendPromptListChanged();
    }
  }
}
var EMPTY_OBJECT_JSON_SCHEMA = {
  type: "object"
};
function isZodRawShape(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  const isEmptyObject = Object.keys(obj).length === 0;
  return isEmptyObject || Object.values(obj).some(isZodTypeLike);
}
function isZodTypeLike(value) {
  return value !== null && typeof value === "object" && "parse" in value && typeof value.parse === "function" && "safeParse" in value && typeof value.safeParse === "function";
}
function promptArgumentsFromSchema(schema) {
  return Object.entries(schema.shape).map(([name, field]) => ({
    name,
    description: field.description,
    required: !field.isOptional()
  }));
}
function createCompletionResult(suggestions) {
  return {
    completion: {
      values: suggestions.slice(0, 100),
      total: suggestions.length,
      hasMore: suggestions.length > 100
    }
  };
}
var EMPTY_COMPLETION_RESULT = {
  completion: {
    values: [],
    hasMore: false
  }
};

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js
import process2 from "node:process";

// node_modules/@modelcontextprotocol/sdk/dist/esm/shared/stdio.js
class ReadBuffer {
  append(chunk) {
    this._buffer = this._buffer ? Buffer.concat([this._buffer, chunk]) : chunk;
  }
  readMessage() {
    if (!this._buffer) {
      return null;
    }
    const index = this._buffer.indexOf(`
`);
    if (index === -1) {
      return null;
    }
    const line = this._buffer.toString("utf8", 0, index).replace(/\r$/, "");
    this._buffer = this._buffer.subarray(index + 1);
    return deserializeMessage(line);
  }
  clear() {
    this._buffer = undefined;
  }
}
function deserializeMessage(line) {
  return JSONRPCMessageSchema.parse(JSON.parse(line));
}
function serializeMessage(message) {
  return JSON.stringify(message) + `
`;
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js
class StdioServerTransport {
  constructor(_stdin = process2.stdin, _stdout = process2.stdout) {
    this._stdin = _stdin;
    this._stdout = _stdout;
    this._readBuffer = new ReadBuffer;
    this._started = false;
    this._ondata = (chunk) => {
      this._readBuffer.append(chunk);
      this.processReadBuffer();
    };
    this._onerror = (error) => {
      var _a;
      (_a = this.onerror) === null || _a === undefined || _a.call(this, error);
    };
  }
  async start() {
    if (this._started) {
      throw new Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");
    }
    this._started = true;
    this._stdin.on("data", this._ondata);
    this._stdin.on("error", this._onerror);
  }
  processReadBuffer() {
    var _a, _b;
    while (true) {
      try {
        const message = this._readBuffer.readMessage();
        if (message === null) {
          break;
        }
        (_a = this.onmessage) === null || _a === undefined || _a.call(this, message);
      } catch (error) {
        (_b = this.onerror) === null || _b === undefined || _b.call(this, error);
      }
    }
  }
  async close() {
    var _a;
    this._stdin.off("data", this._ondata);
    this._stdin.off("error", this._onerror);
    const remainingDataListeners = this._stdin.listenerCount("data");
    if (remainingDataListeners === 0) {
      this._stdin.pause();
    }
    this._readBuffer.clear();
    (_a = this.onclose) === null || _a === undefined || _a.call(this);
  }
  send(message) {
    return new Promise((resolve) => {
      const json = serializeMessage(message);
      if (this._stdout.write(json)) {
        resolve();
      } else {
        this._stdout.once("drain", resolve);
      }
    });
  }
}

// node_modules/graphql/jsutils/devAssert.mjs
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}

// node_modules/graphql/jsutils/inspect.mjs
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? `[function ${value.name}]` : "[function]";
    case "object":
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return "null";
  }
  if (previouslySeenValues.includes(value)) {
    return "[Circular]";
  }
  const seenValues = [...previouslySeenValues, value];
  if (isJSONable(value)) {
    const jsonValue = value.toJSON();
    if (jsonValue !== value) {
      return typeof jsonValue === "string" ? jsonValue : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function isJSONable(value) {
  return typeof value.toJSON === "function";
}
function formatObject(object2, seenValues) {
  const entries = Object.entries(object2);
  if (entries.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object2) + "]";
  }
  const properties = entries.map(([key, value]) => key + ": " + formatValue(value, seenValues));
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array2, seenValues) {
  if (array2.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  const len = Math.min(MAX_ARRAY_LENGTH, array2.length);
  const remaining = array2.length - len;
  const items = [];
  for (let i = 0;i < len; ++i) {
    items.push(formatValue(array2[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }
  return "[" + items.join(", ") + "]";
}
function getObjectTag(object2) {
  const tag = Object.prototype.toString.call(object2).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object2.constructor === "function") {
    const name = object2.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}

// node_modules/graphql/jsutils/instanceOf.mjs
var isProduction = globalThis.process && false;
var instanceOf = isProduction ? function instanceOf2(value, constructor) {
  return value instanceof constructor;
} : function instanceOf3(value, constructor) {
  if (value instanceof constructor) {
    return true;
  }
  if (typeof value === "object" && value !== null) {
    var _value$constructor;
    const className = constructor.prototype[Symbol.toStringTag];
    const valueClassName = Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === undefined ? undefined : _value$constructor.name;
    if (className === valueClassName) {
      const stringifiedValue = inspect(value);
      throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
    }
  }
  return false;
};

// node_modules/graphql/language/source.mjs
class Source {
  constructor(body, name = "GraphQL request", locationOffset = {
    line: 1,
    column: 1
  }) {
    typeof body === "string" || devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(false, "line in locationOffset is 1-indexed and must be positive.");
    this.locationOffset.column > 0 || devAssert(false, "column in locationOffset is 1-indexed and must be positive.");
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
}
function isSource(source) {
  return instanceOf(source, Source);
}

// node_modules/graphql/jsutils/invariant.mjs
function invariant(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message != null ? message : "Unexpected invariant triggered.");
  }
}

// node_modules/graphql/language/location.mjs
var LineRegExp = /\r\n|[\n\r]/g;
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;
  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === "number" || invariant(false);
    if (match.index >= position) {
      break;
    }
    lastLineStart = match.index + match[0].length;
    line += 1;
  }
  return {
    line,
    column: position + 1 - lastLineStart
  };
}

// node_modules/graphql/language/printLocation.mjs
function printLocation(location) {
  return printSourceLocation(location.source, getLocation(location.source, location.start));
}
function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = "".padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}
`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];
    for (let i = 0;i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([
      [`${lineNum} |`, subLines[0]],
      ...subLines.slice(1, subLineIndex + 1).map((subLine) => ["|", subLine]),
      ["|", "^".padStart(subLineColumnNum)],
      ["|", subLines[subLineIndex + 1]]
    ]);
  }
  return locationStr + printPrefixedLines([
    [`${lineNum - 1} |`, lines[lineIndex - 1]],
    [`${lineNum} |`, locationLine],
    ["|", "^".padStart(columnNum)],
    [`${lineNum + 1} |`, lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== undefined);
  const padLen = Math.max(...existingLines.map(([prefix]) => prefix.length));
  return existingLines.map(([prefix, line]) => prefix.padStart(padLen) + (line ? " " + line : "")).join(`
`);
}

// node_modules/graphql/language/kinds.mjs
var Kind;
(function(Kind2) {
  Kind2["NAME"] = "Name";
  Kind2["DOCUMENT"] = "Document";
  Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
  Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
  Kind2["SELECTION_SET"] = "SelectionSet";
  Kind2["FIELD"] = "Field";
  Kind2["ARGUMENT"] = "Argument";
  Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
  Kind2["INLINE_FRAGMENT"] = "InlineFragment";
  Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
  Kind2["VARIABLE"] = "Variable";
  Kind2["INT"] = "IntValue";
  Kind2["FLOAT"] = "FloatValue";
  Kind2["STRING"] = "StringValue";
  Kind2["BOOLEAN"] = "BooleanValue";
  Kind2["NULL"] = "NullValue";
  Kind2["ENUM"] = "EnumValue";
  Kind2["LIST"] = "ListValue";
  Kind2["OBJECT"] = "ObjectValue";
  Kind2["OBJECT_FIELD"] = "ObjectField";
  Kind2["DIRECTIVE"] = "Directive";
  Kind2["NAMED_TYPE"] = "NamedType";
  Kind2["LIST_TYPE"] = "ListType";
  Kind2["NON_NULL_TYPE"] = "NonNullType";
  Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
  Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
  Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
  Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
  Kind2["FIELD_DEFINITION"] = "FieldDefinition";
  Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
  Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
  Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
  Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
  Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
  Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
  Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
  Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
  Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
  Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
  Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
  Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
  Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
  Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
})(Kind || (Kind = {}));

// node_modules/graphql/language/tokenKind.mjs
var TokenKind;
(function(TokenKind2) {
  TokenKind2["SOF"] = "<SOF>";
  TokenKind2["EOF"] = "<EOF>";
  TokenKind2["BANG"] = "!";
  TokenKind2["DOLLAR"] = "$";
  TokenKind2["AMP"] = "&";
  TokenKind2["PAREN_L"] = "(";
  TokenKind2["PAREN_R"] = ")";
  TokenKind2["SPREAD"] = "...";
  TokenKind2["COLON"] = ":";
  TokenKind2["EQUALS"] = "=";
  TokenKind2["AT"] = "@";
  TokenKind2["BRACKET_L"] = "[";
  TokenKind2["BRACKET_R"] = "]";
  TokenKind2["BRACE_L"] = "{";
  TokenKind2["PIPE"] = "|";
  TokenKind2["BRACE_R"] = "}";
  TokenKind2["NAME"] = "Name";
  TokenKind2["INT"] = "Int";
  TokenKind2["FLOAT"] = "Float";
  TokenKind2["STRING"] = "String";
  TokenKind2["BLOCK_STRING"] = "BlockString";
  TokenKind2["COMMENT"] = "Comment";
})(TokenKind || (TokenKind = {}));

// node_modules/graphql/jsutils/isObjectLike.mjs
function isObjectLike(value) {
  return typeof value == "object" && value !== null;
}

// node_modules/graphql/error/GraphQLError.mjs
function toNormalizedOptions(args) {
  const firstArg = args[0];
  if (firstArg == null || "kind" in firstArg || "length" in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5]
    };
  }
  return firstArg;
}

class GraphQLError extends Error {
  constructor(message, ...rawArgs) {
    var _this$nodes, _nodeLocations$, _ref;
    const { nodes, source, positions, path, originalError, extensions } = toNormalizedOptions(rawArgs);
    super(message);
    this.name = "GraphQLError";
    this.path = path !== null && path !== undefined ? path : undefined;
    this.originalError = originalError !== null && originalError !== undefined ? originalError : undefined;
    this.nodes = undefinedIfEmpty(Array.isArray(nodes) ? nodes : nodes ? [nodes] : undefined);
    const nodeLocations = undefinedIfEmpty((_this$nodes = this.nodes) === null || _this$nodes === undefined ? undefined : _this$nodes.map((node) => node.loc).filter((loc) => loc != null));
    this.source = source !== null && source !== undefined ? source : nodeLocations === null || nodeLocations === undefined ? undefined : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === undefined ? undefined : _nodeLocations$.source;
    this.positions = positions !== null && positions !== undefined ? positions : nodeLocations === null || nodeLocations === undefined ? undefined : nodeLocations.map((loc) => loc.start);
    this.locations = positions && source ? positions.map((pos) => getLocation(source, pos)) : nodeLocations === null || nodeLocations === undefined ? undefined : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
    const originalExtensions = isObjectLike(originalError === null || originalError === undefined ? undefined : originalError.extensions) ? originalError === null || originalError === undefined ? undefined : originalError.extensions : undefined;
    this.extensions = (_ref = extensions !== null && extensions !== undefined ? extensions : originalExtensions) !== null && _ref !== undefined ? _ref : Object.create(null);
    Object.defineProperties(this, {
      message: {
        writable: true,
        enumerable: true
      },
      name: {
        enumerable: false
      },
      nodes: {
        enumerable: false
      },
      source: {
        enumerable: false
      },
      positions: {
        enumerable: false
      },
      originalError: {
        enumerable: false
      }
    });
    if (originalError !== null && originalError !== undefined && originalError.stack) {
      Object.defineProperty(this, "stack", {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLError);
    } else {
      Object.defineProperty(this, "stack", {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let output = this.message;
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.loc) {
          output += `

` + printLocation(node.loc);
        }
      }
    } else if (this.source && this.locations) {
      for (const location of this.locations) {
        output += `

` + printSourceLocation(this.source, location);
      }
    }
    return output;
  }
  toJSON() {
    const formattedError = {
      message: this.message
    };
    if (this.locations != null) {
      formattedError.locations = this.locations;
    }
    if (this.path != null) {
      formattedError.path = this.path;
    }
    if (this.extensions != null && Object.keys(this.extensions).length > 0) {
      formattedError.extensions = this.extensions;
    }
    return formattedError;
  }
}
function undefinedIfEmpty(array2) {
  return array2 === undefined || array2.length === 0 ? undefined : array2;
}

// node_modules/graphql/error/syntaxError.mjs
function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position]
  });
}

// node_modules/graphql/language/ast.mjs
class Location {
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
}

class Token {
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
}
var QueryDocumentKeys = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
};
var kindValues = new Set(Object.keys(QueryDocumentKeys));
var OperationTypeNode;
(function(OperationTypeNode2) {
  OperationTypeNode2["QUERY"] = "query";
  OperationTypeNode2["MUTATION"] = "mutation";
  OperationTypeNode2["SUBSCRIPTION"] = "subscription";
})(OperationTypeNode || (OperationTypeNode = {}));

// node_modules/graphql/language/characterClasses.mjs
function isWhiteSpace(code) {
  return code === 9 || code === 32;
}
function isDigit(code) {
  return code >= 48 && code <= 57;
}
function isLetter(code) {
  return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function isNameStart(code) {
  return isLetter(code) || code === 95;
}
function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 95;
}

// node_modules/graphql/language/blockString.mjs
function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;
  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;
  for (let i = 0;i < lines.length; ++i) {
    var _firstNonEmptyLine;
    const line = lines[i];
    const indent = leadingWhitespace(line);
    if (indent === line.length) {
      continue;
    }
    firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== undefined ? _firstNonEmptyLine : i;
    lastNonEmptyLine = i;
    if (i !== 0 && indent < commonIndent) {
      commonIndent = indent;
    }
  }
  return lines.map((line, i) => i === 0 ? line : line.slice(commonIndent)).slice((_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== undefined ? _firstNonEmptyLine2 : 0, lastNonEmptyLine + 1);
}
function leadingWhitespace(str) {
  let i = 0;
  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }
  return i;
}

// node_modules/graphql/language/lexer.mjs
class Lexer {
  constructor(source) {
    const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  advance() {
    this.lastToken = this.token;
    const token = this.token = this.lookahead();
    return token;
  }
  lookahead() {
    let token = this.token;
    if (token.kind !== TokenKind.EOF) {
      do {
        if (token.next) {
          token = token.next;
        } else {
          const nextToken = readNextToken(this, token.end);
          token.next = nextToken;
          nextToken.prev = token;
          token = nextToken;
        }
      } while (token.kind === TokenKind.COMMENT);
    }
    return token;
  }
}
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function isUnicodeScalarValue(code) {
  return code >= 0 && code <= 55295 || code >= 57344 && code <= 1114111;
}
function isSupplementaryCodePoint(body, location) {
  return isLeadingSurrogate(body.charCodeAt(location)) && isTrailingSurrogate(body.charCodeAt(location + 1));
}
function isLeadingSurrogate(code) {
  return code >= 55296 && code <= 56319;
}
function isTrailingSurrogate(code) {
  return code >= 56320 && code <= 57343;
}
function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);
  if (code === undefined) {
    return TokenKind.EOF;
  } else if (code >= 32 && code <= 126) {
    const char = String.fromCodePoint(code);
    return char === '"' ? `'"'` : `"${char}"`;
  }
  return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
}
function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new Token(kind, start, end, line, col, value);
}
function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    switch (code) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++position;
        continue;
      case 10:
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      case 13:
        if (body.charCodeAt(position + 1) === 10) {
          position += 2;
        } else {
          ++position;
        }
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      case 35:
        return readComment(lexer, position);
      case 33:
        return createToken(lexer, TokenKind.BANG, position, position + 1);
      case 36:
        return createToken(lexer, TokenKind.DOLLAR, position, position + 1);
      case 38:
        return createToken(lexer, TokenKind.AMP, position, position + 1);
      case 40:
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);
      case 41:
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);
      case 46:
        if (body.charCodeAt(position + 1) === 46 && body.charCodeAt(position + 2) === 46) {
          return createToken(lexer, TokenKind.SPREAD, position, position + 3);
        }
        break;
      case 58:
        return createToken(lexer, TokenKind.COLON, position, position + 1);
      case 61:
        return createToken(lexer, TokenKind.EQUALS, position, position + 1);
      case 64:
        return createToken(lexer, TokenKind.AT, position, position + 1);
      case 91:
        return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);
      case 93:
        return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);
      case 123:
        return createToken(lexer, TokenKind.BRACE_L, position, position + 1);
      case 124:
        return createToken(lexer, TokenKind.PIPE, position, position + 1);
      case 125:
        return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
      case 34:
        if (body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
          return readBlockString(lexer, position);
        }
        return readString(lexer, position);
    }
    if (isDigit(code) || code === 45) {
      return readNumber(lexer, position, code);
    }
    if (isNameStart(code)) {
      return readName(lexer, position);
    }
    throw syntaxError(lexer.source, position, code === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? `Unexpected character: ${printCodePointAt(lexer, position)}.` : `Invalid character: ${printCodePointAt(lexer, position)}.`);
  }
  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }
  return createToken(lexer, TokenKind.COMMENT, start, position, body.slice(start + 1, position));
}
function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (isDigit(code)) {
      throw syntaxError(lexer.source, position, `Invalid number, unexpected digit after 0: ${printCodePointAt(lexer, position)}.`);
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(lexer.source, position, `Invalid number, expected digit but got: ${printCodePointAt(lexer, position)}.`);
  }
  return createToken(lexer, isFloat ? TokenKind.FLOAT : TokenKind.INT, start, position, body.slice(start, position));
}
function readDigits(lexer, start, firstCode) {
  if (!isDigit(firstCode)) {
    throw syntaxError(lexer.source, start, `Invalid number, expected digit but got: ${printCodePointAt(lexer, start)}.`);
  }
  const body = lexer.source.body;
  let position = start + 1;
  while (isDigit(body.charCodeAt(position))) {
    ++position;
  }
  return position;
}
function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = "";
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, TokenKind.STRING, start, position + 1, value);
    }
    if (code === 92) {
      value += body.slice(chunkStart, position);
      const escape = body.charCodeAt(position + 1) === 117 ? body.charCodeAt(position + 2) === 123 ? readEscapedUnicodeVariableWidth(lexer, position) : readEscapedUnicodeFixedWidth(lexer, position) : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    }
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(lexer.source, position, `Invalid character within String: ${printCodePointAt(lexer, position)}.`);
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3;
  while (size < 12) {
    const code = body.charCodeAt(position + size++);
    if (code === 125) {
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }
      return {
        value: String.fromCodePoint(point),
        size
      };
    }
    point = point << 4 | readHexDigit(code);
    if (point < 0) {
      break;
    }
  }
  throw syntaxError(lexer.source, position, `Invalid Unicode escape sequence: "${body.slice(position, position + size)}".`);
}
function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);
  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6
    };
  }
  if (isLeadingSurrogate(code)) {
    if (body.charCodeAt(position + 6) === 92 && body.charCodeAt(position + 7) === 117) {
      const trailingCode = read16BitHexCode(body, position + 8);
      if (isTrailingSurrogate(trailingCode)) {
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12
        };
      }
    }
  }
  throw syntaxError(lexer.source, position, `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`);
}
function read16BitHexCode(body, position) {
  return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
}
function readHexDigit(code) {
  return code >= 48 && code <= 57 ? code - 48 : code >= 65 && code <= 70 ? code - 55 : code >= 97 && code <= 102 ? code - 87 : -1;
}
function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);
  switch (code) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: `
`,
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "\t",
        size: 2
      };
  }
  throw syntaxError(lexer.source, position, `Invalid character escape sequence: "${body.slice(position, position + 2)}".`);
}
function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = "";
  const blockLines = [];
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(lexer, TokenKind.BLOCK_STRING, start, position + 3, dedentBlockStringLines(blockLines).join(`
`));
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    }
    if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1;
      position += 4;
      continue;
    }
    if (code === 10 || code === 13) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      if (code === 13 && body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      currentLine = "";
      chunkStart = position;
      lineStart = position;
      continue;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(lexer.source, position, `Invalid character within String: ${printCodePointAt(lexer, position)}.`);
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }
  return createToken(lexer, TokenKind.NAME, start, position, body.slice(start, position));
}

// node_modules/graphql/language/directiveLocation.mjs
var DirectiveLocation;
(function(DirectiveLocation2) {
  DirectiveLocation2["QUERY"] = "QUERY";
  DirectiveLocation2["MUTATION"] = "MUTATION";
  DirectiveLocation2["SUBSCRIPTION"] = "SUBSCRIPTION";
  DirectiveLocation2["FIELD"] = "FIELD";
  DirectiveLocation2["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
  DirectiveLocation2["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
  DirectiveLocation2["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
  DirectiveLocation2["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
  DirectiveLocation2["SCHEMA"] = "SCHEMA";
  DirectiveLocation2["SCALAR"] = "SCALAR";
  DirectiveLocation2["OBJECT"] = "OBJECT";
  DirectiveLocation2["FIELD_DEFINITION"] = "FIELD_DEFINITION";
  DirectiveLocation2["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
  DirectiveLocation2["INTERFACE"] = "INTERFACE";
  DirectiveLocation2["UNION"] = "UNION";
  DirectiveLocation2["ENUM"] = "ENUM";
  DirectiveLocation2["ENUM_VALUE"] = "ENUM_VALUE";
  DirectiveLocation2["INPUT_OBJECT"] = "INPUT_OBJECT";
  DirectiveLocation2["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
})(DirectiveLocation || (DirectiveLocation = {}));

// node_modules/graphql/language/parser.mjs
function parse(source, options) {
  const parser = new Parser(source, options);
  const document = parser.parseDocument();
  Object.defineProperty(document, "tokenCount", {
    enumerable: false,
    value: parser.tokenCount
  });
  return document;
}
class Parser {
  constructor(source, options = {}) {
    const sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
    this._tokenCounter = 0;
  }
  get tokenCount() {
    return this._tokenCounter;
  }
  parseName() {
    const token = this.expectToken(TokenKind.NAME);
    return this.node(token, {
      kind: Kind.NAME,
      value: token.value
    });
  }
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: Kind.DOCUMENT,
      definitions: this.many(TokenKind.SOF, this.parseDefinition, TokenKind.EOF)
    });
  }
  parseDefinition() {
    if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    }
    const hasDescription = this.peekDescription();
    const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (hasDescription) {
        throw syntaxError(this._lexer.source, this._lexer.token.start, "Unexpected description, descriptions are supported only on type definitions.");
      }
      switch (keywordToken.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(keywordToken);
  }
  parseOperationDefinition() {
    const start = this._lexer.token;
    if (this.peek(TokenKind.BRACE_L)) {
      return this.node(start, {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        name: undefined,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    }
    const operation = this.parseOperationType();
    let name;
    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }
    return this.node(start, {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  parseOperationType() {
    const operationToken = this.expectToken(TokenKind.NAME);
    switch (operationToken.value) {
      case "query":
        return OperationTypeNode.QUERY;
      case "mutation":
        return OperationTypeNode.MUTATION;
      case "subscription":
        return OperationTypeNode.SUBSCRIPTION;
    }
    throw this.unexpected(operationToken);
  }
  parseVariableDefinitions() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseVariableDefinition, TokenKind.PAREN_R);
  }
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseConstValueLiteral() : undefined,
      directives: this.parseConstDirectives()
    });
  }
  parseVariable() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return this.node(start, {
      kind: Kind.VARIABLE,
      name: this.parseName()
    });
  }
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: Kind.SELECTION_SET,
      selections: this.many(TokenKind.BRACE_L, this.parseSelection, TokenKind.BRACE_R)
    });
  }
  parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  }
  parseField() {
    const start = this._lexer.token;
    const nameOrAlias = this.parseName();
    let alias;
    let name;
    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }
    return this.node(start, {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : undefined
    });
  }
  parseArguments(isConst) {
    const item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  }
  parseArgument(isConst = false) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(isConst)
    });
  }
  parseConstArgument() {
    return this.parseArgument(true);
  }
  parseFragment() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    const hasTypeCondition = this.expectOptionalKeyword("on");
    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return this.node(start, {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false)
      });
    }
    return this.node(start, {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : undefined,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  parseFragmentDefinition() {
    const start = this._lexer.token;
    this.expectKeyword("fragment");
    if (this._options.allowLegacyFragmentVariables === true) {
      return this.node(start, {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    return this.node(start, {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  parseFragmentName() {
    if (this._lexer.token.value === "on") {
      throw this.unexpected();
    }
    return this.parseName();
  }
  parseValueLiteral(isConst) {
    const token = this._lexer.token;
    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);
      case TokenKind.BRACE_L:
        return this.parseObject(isConst);
      case TokenKind.INT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.INT,
          value: token.value
        });
      case TokenKind.FLOAT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.FLOAT,
          value: token.value
        });
      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();
      case TokenKind.NAME:
        this.advanceLexer();
        switch (token.value) {
          case "true":
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: true
            });
          case "false":
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: false
            });
          case "null":
            return this.node(token, {
              kind: Kind.NULL
            });
          default:
            return this.node(token, {
              kind: Kind.ENUM,
              value: token.value
            });
        }
      case TokenKind.DOLLAR:
        if (isConst) {
          this.expectToken(TokenKind.DOLLAR);
          if (this._lexer.token.kind === TokenKind.NAME) {
            const varName = this._lexer.token.value;
            throw syntaxError(this._lexer.source, token.start, `Unexpected variable "$${varName}" in constant value.`);
          } else {
            throw this.unexpected(token);
          }
        }
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(true);
  }
  parseStringLiteral() {
    const token = this._lexer.token;
    this.advanceLexer();
    return this.node(token, {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING
    });
  }
  parseList(isConst) {
    const item = () => this.parseValueLiteral(isConst);
    return this.node(this._lexer.token, {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R)
    });
  }
  parseObject(isConst) {
    const item = () => this.parseObjectField(isConst);
    return this.node(this._lexer.token, {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R)
    });
  }
  parseObjectField(isConst) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst)
    });
  }
  parseDirectives(isConst) {
    const directives = [];
    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }
    return directives;
  }
  parseConstDirectives() {
    return this.parseDirectives(true);
  }
  parseDirective(isConst) {
    const start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return this.node(start, {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst)
    });
  }
  parseTypeReference() {
    const start = this._lexer.token;
    let type;
    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      const innerType = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = this.node(start, {
        kind: Kind.LIST_TYPE,
        type: innerType
      });
    } else {
      type = this.parseNamedType();
    }
    if (this.expectOptionalToken(TokenKind.BANG)) {
      return this.node(start, {
        kind: Kind.NON_NULL_TYPE,
        type
      });
    }
    return type;
  }
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: Kind.NAMED_TYPE,
      name: this.parseName()
    });
  }
  peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  }
  parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  parseSchemaDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("schema");
    const directives = this.parseConstDirectives();
    const operationTypes = this.many(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    return this.node(start, {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes
    });
  }
  parseOperationTypeDefinition() {
    const start = this._lexer.token;
    const operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    const type = this.parseNamedType();
    return this.node(start, {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type
    });
  }
  parseScalarTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("scalar");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives
    });
  }
  parseObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("type");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields
    });
  }
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(TokenKind.AMP, this.parseNamedType) : [];
  }
  parseFieldsDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseFieldDefinition, TokenKind.BRACE_R);
  }
  parseFieldDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives
    });
  }
  parseArgumentDefs() {
    return this.optionalMany(TokenKind.PAREN_L, this.parseInputValueDef, TokenKind.PAREN_R);
  }
  parseInputValueDef() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    let defaultValue;
    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseConstValueLiteral();
    }
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives
    });
  }
  parseInterfaceTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("interface");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields
    });
  }
  parseUnionTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("union");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types2 = this.parseUnionMemberTypes();
    return this.node(start, {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types: types2
    });
  }
  parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  }
  parseEnumTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("enum");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    return this.node(start, {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values
    });
  }
  parseEnumValuesDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseEnumValueDefinition, TokenKind.BRACE_R);
  }
  parseEnumValueDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseEnumValueName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives
    });
  }
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") {
      throw syntaxError(this._lexer.source, this._lexer.token.start, `${getTokenDesc(this._lexer.token)} is reserved and cannot be used for an enum value.`);
    }
    return this.parseName();
  }
  parseInputObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("input");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields
    });
  }
  parseInputFieldsDefinition() {
    return this.optionalMany(TokenKind.BRACE_L, this.parseInputValueDef, TokenKind.BRACE_R);
  }
  parseTypeSystemExtension() {
    const keywordToken = this._lexer.lookahead();
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    }
    throw this.unexpected(keywordToken);
  }
  parseSchemaExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("schema");
    const directives = this.parseConstDirectives();
    const operationTypes = this.optionalMany(TokenKind.BRACE_L, this.parseOperationTypeDefinition, TokenKind.BRACE_R);
    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes
    });
  }
  parseScalarTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("scalar");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    if (directives.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives
    });
  }
  parseObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("type");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields
    });
  }
  parseInterfaceTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("interface");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields
    });
  }
  parseUnionTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("union");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types2 = this.parseUnionMemberTypes();
    if (directives.length === 0 && types2.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types: types2
    });
  }
  parseEnumTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("enum");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values
    });
  }
  parseInputObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("input");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields
    });
  }
  parseDirectiveDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("directive");
    this.expectToken(TokenKind.AT);
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    const repeatable = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const locations = this.parseDirectiveLocations();
    return this.node(start, {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations
    });
  }
  parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  }
  parseDirectiveLocation() {
    const start = this._lexer.token;
    const name = this.parseName();
    if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
      return name;
    }
    throw this.unexpected(start);
  }
  node(startToken, node) {
    if (this._options.noLocation !== true) {
      node.loc = new Location(startToken, this._lexer.lastToken, this._lexer.source);
    }
    return node;
  }
  peek(kind) {
    return this._lexer.token.kind === kind;
  }
  expectToken(kind) {
    const token = this._lexer.token;
    if (token.kind === kind) {
      this.advanceLexer();
      return token;
    }
    throw syntaxError(this._lexer.source, token.start, `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`);
  }
  expectOptionalToken(kind) {
    const token = this._lexer.token;
    if (token.kind === kind) {
      this.advanceLexer();
      return true;
    }
    return false;
  }
  expectKeyword(value) {
    const token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
    } else {
      throw syntaxError(this._lexer.source, token.start, `Expected "${value}", found ${getTokenDesc(token)}.`);
    }
  }
  expectOptionalKeyword(value) {
    const token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
      return true;
    }
    return false;
  }
  unexpected(atToken) {
    const token = atToken !== null && atToken !== undefined ? atToken : this._lexer.token;
    return syntaxError(this._lexer.source, token.start, `Unexpected ${getTokenDesc(token)}.`);
  }
  any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];
    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }
    return nodes;
  }
  optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      const nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    return [];
  }
  many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));
    return nodes;
  }
  delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    const nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));
    return nodes;
  }
  advanceLexer() {
    const { maxTokens } = this._options;
    const token = this._lexer.advance();
    if (token.kind !== TokenKind.EOF) {
      ++this._tokenCounter;
      if (maxTokens !== undefined && this._tokenCounter > maxTokens) {
        throw syntaxError(this._lexer.source, token.start, `Document contains more that ${maxTokens} tokens. Parsing aborted.`);
      }
    }
  }
}
function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}
// src/helpers/deprecation.ts
function checkDeprecatedArguments() {
  const deprecatedArgs = [
    "--endpoint",
    "--headers",
    "--enable-mutations",
    "--name",
    "--schema"
  ];
  const usedDeprecatedArgs = deprecatedArgs.filter((arg) => process.argv.includes(arg));
  if (usedDeprecatedArgs.length > 0) {
    console.error(`WARNING: Deprecated command line arguments detected: ${usedDeprecatedArgs.join(", ")}`);
    console.error("As of version 1.0.0, command line arguments have been replaced with environment variables.");
    console.error("Please use environment variables instead. For example:");
    console.error("  Instead of: npx mcp-graphql --endpoint http://example.com/graphql");
    console.error("  Use: ENDPOINT=http://example.com/graphql npx mcp-graphql");
    console.error("");
  }
}

// src/helpers/introspection.ts
var import_graphql = __toESM(require_graphql2(), 1);
import { readFile } from "node:fs/promises";
async function introspectEndpoint(endpoint, headers) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers
    },
    body: JSON.stringify({
      query: import_graphql.getIntrospectionQuery()
    })
  });
  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }
  const responseJson = await response.json();
  const schema = import_graphql.buildClientSchema(responseJson.data);
  return import_graphql.printSchema(schema);
}
async function introspectLocalSchema(path) {
  const schema = await readFile(path, "utf8");
  return schema;
}

// src/index.ts
checkDeprecatedArguments();
var EnvSchema = exports_external.object({
  NAME: exports_external.string().default("mcp-graphql"),
  ENDPOINT: exports_external.string().url().default("http://localhost:4000/graphql"),
  ALLOW_MUTATIONS: exports_external.enum(["true", "false"]).transform((value) => value === "true").default("false"),
  HEADERS: exports_external.string().default("{}").transform((val) => {
    try {
      return JSON.parse(val);
    } catch (e) {
      throw new Error("HEADERS must be a valid JSON string");
    }
  }),
  SCHEMA: exports_external.string().optional()
});
var env = EnvSchema.parse(process.env);
var server = new McpServer({
  name: env.NAME,
  version: "2.0.4",
  description: `GraphQL MCP server for ${env.ENDPOINT}`
});
server.resource("graphql-schema", new URL(env.ENDPOINT).href, async (uri) => {
  try {
    let schema;
    if (env.SCHEMA) {
      schema = await introspectLocalSchema(env.SCHEMA);
    } else {
      schema = await introspectEndpoint(env.ENDPOINT, env.HEADERS);
    }
    return {
      contents: [
        {
          uri: uri.href,
          text: schema
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to get GraphQL schema: ${error}`);
  }
});
server.tool("introspect-schema", "Introspect the GraphQL schema, use this tool before doing a query to get the schema information if you do not have it available as a resource already.", {
  __ignore__: exports_external.boolean().default(false).describe("This does not do anything"),
  headers: exports_external.record(exports_external.string(), exports_external.string()).optional().default({}).describe("Additional headers to merge with environment HEADERS")
}, async ({ __ignore__, headers }) => {
  const requestHeaders = { ...env.HEADERS, ...headers };
  try {
    let schema;
    if (env.SCHEMA) {
      schema = await introspectLocalSchema(env.SCHEMA);
    } else {
      schema = await introspectEndpoint(env.ENDPOINT, requestHeaders);
    }
    return {
      content: [
        {
          type: "text",
          text: schema
        }
      ]
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Failed to introspect schema: ${error}`
        }
      ]
    };
  }
});
server.tool("query-graphql", "Query a GraphQL endpoint with the given query and variables", {
  query: exports_external.string(),
  variables: exports_external.string().optional(),
  headers: exports_external.record(exports_external.string(), exports_external.string()).optional().default({}).describe("Additional headers to merge with environment HEADERS")
}, async ({ query, variables, headers }) => {
  try {
    const parsedQuery = parse(query);
    const isMutation = parsedQuery.definitions.some((def) => def.kind === "OperationDefinition" && def.operation === "mutation");
    if (isMutation && !env.ALLOW_MUTATIONS) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: "Mutations are not allowed unless you enable them in the configuration. Please use a query operation instead."
          }
        ]
      };
    }
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: "text",
          text: `Invalid GraphQL query: ${error}`
        }
      ]
    };
  }
  try {
    const response = await fetch(env.ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...env.HEADERS,
        ...headers
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    if (!response.ok) {
      const responseText = await response.text();
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `GraphQL request failed: ${response.statusText}
${responseText}`
          }
        ]
      };
    }
    const data = await response.json();
    if (data.errors && data.errors.length > 0) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `The GraphQL response has errors, please fix the query: ${JSON.stringify(data, null, 2)}`
          }
        ]
      };
    }
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2)
        }
      ]
    };
  } catch (error) {
    throw new Error(`Failed to execute GraphQL query: ${error}`);
  }
});
if (env.ALLOW_MUTATIONS) {
  server.tool("mutation-graphql", "Execute a GraphQL mutation against the endpoint", {
    mutation: exports_external.string(),
    variables: exports_external.string().optional(),
    headers: exports_external.record(exports_external.string(), exports_external.string()).optional().default({}).describe("Additional headers to merge with environment HEADERS")
  }, async ({ mutation, variables, headers }) => {
    try {
      const parsedMutation = parse(mutation);
      const isMutationOp = parsedMutation.definitions.some((def) => def.kind === "OperationDefinition" && def.operation === "mutation");
      if (!isMutationOp) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: "Only mutation operations are allowed with this tool. Please provide a valid GraphQL mutation."
            }
          ]
        };
      }
    } catch (error) {
      return {
        isError: true,
        content: [
          {
            type: "text",
            text: `Invalid GraphQL mutation: ${error}`
          }
        ]
      };
    }
    try {
      const response = await fetch(env.ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...env.HEADERS,
          ...headers
        },
        body: JSON.stringify({ query: mutation, variables })
      });
      if (!response.ok) {
        const responseText = await response.text();
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `GraphQL mutation failed: ${response.statusText}
${responseText}`
            }
          ]
        };
      }
      const data = await response.json();
      if (data.errors && data.errors.length > 0) {
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: `The GraphQL mutation response has errors: ${JSON.stringify(data, null, 2)}`
            }
          ]
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(data, null, 2)
          }
        ]
      };
    } catch (error) {
      throw new Error(`Failed to execute GraphQL mutation: ${error}`);
    }
  });
}
async function main() {
  const transport = new StdioServerTransport;
  await server.connect(transport);
  console.error(`Started graphql mcp server ${env.NAME} for endpoint: ${env.ENDPOINT}`);
}
main().catch((error) => {
  console.error(`Fatal error in main(): ${error}`);
  process.exit(1);
});
