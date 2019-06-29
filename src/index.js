/**
 * This transforms react styled-system themed component's space prop values
 *
 *
 * == INPUT ==
 *
 *  <Component pr={3} m="4" p={2} p="auto" mr={[3, 4]} />
 *
 * == OUTPUT ==
 *
 *  <Component pr={4} m="5" p={2} p="auto" mr={[4, 5]} />;
 *
 * see more examples in test folder
 */

module.exports = function(babel) {
  const { types: t } = babel;

  const isConditionMet = value => value >= 3;

  const isDesiredPropName = name =>
    [
      "p",
      "px",
      "py",
      "pb",
      "pt",
      "pr",
      "pl",
      "m",
      "mx",
      "my",
      "mb",
      "mt",
      "mr",
      "ml"
    ].includes(name);

  const bumpSpaceIndexValue = node => {
    if (t.isArrayExpression(node)) {
      node.elements.forEach(element => {
        bumpSpaceIndexValue(element);
      });
    } else if (t.isNumericLiteral(node) && isConditionMet(node.value)) {
      node.value++;
    } else if (t.isStringLiteral(node)) {
      let n = parseInt(node.value, 10);
      if (isConditionMet(n)) {
        node.value = String(n + 1);
      }
    }
  };

  return {
    name: "trasnform-react-styled-system-space-index",
    visitor: {
      JSXAttribute(path) {
        const identifierName = path.get("name").node.name;
        if (isDesiredPropName(identifierName)) {
          const value = path.get("value");

          if (t.isJSXExpressionContainer(value)) {
            bumpSpaceIndexValue(value.node.expression);
          } else if (t.isStringLiteral(value)) {
            bumpSpaceIndexValue(value.node);
          }
        }
      },
      Identifier(path) {
        if (path.node.name === "defaultProps") {
          const assignmentExpression = path.find(_ =>
            _.isAssignmentExpression()
          );
          const right = assignmentExpression.get("right");

          if (t.isObjectExpression(right)) {
            const properties = assignmentExpression.get("right.properties");
            properties.forEach(node => {
              if (isDesiredPropName(node.node.key.name)) {
                bumpSpaceIndexValue(node.node.value);
              }
            });
          } else {
            const assignmentIdentifier = assignmentExpression.get(
              "left.property"
            );
            let identifierName;

            // handle Component.defaultProps.mr
            if (t.isIdentifier(assignmentIdentifier)) {
              identifierName = assignmentIdentifier.node.name;
            } else if (t.isStringLiteral(assignmentIdentifier)) {
              // Handle Component.defaultProps["mr"]
              identifierName = assignmentIdentifier.node.value;
            }

            if (isDesiredPropName(identifierName)) {
              bumpSpaceIndexValue(assignmentExpression.get("right").node);
            }
          }
        }
      }
    }
  };
};
