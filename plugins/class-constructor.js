const t = require("@babel/types")
module.exports = function() {
  return {
    name: "minits-plugin-class-constructor",
    visitor: {
      ClassDeclaration(classPath) {
        classPath.traverse({
          ClassMethod(path) {
            if (path.node.key.name === 'constructor') {
              const className = classPath.node.id.name 
              const idString = `${className}_constructor`
              const id = t.identifier(idString)
              const params = JSON.parse(JSON.stringify( [t.identifier(`_this: ${className}`)].concat(path.node.params)))
              const body = JSON.parse(JSON.stringify(path.node.body))
              const newConstructor = t.functionDeclaration(id,params,body,false,false)
              newConstructor.returnType = t.identifier(': void')
              const newConstructorPath = classPath.insertAfter(newConstructor)
              newConstructorPath[0].traverse({
                ThisExpression(p){
                  p.replaceWith(t.identifier('_this'))
                }
              })
            }
          }
        })
      },
      NewExpression(path,state){
        let node = path.node
        let args = node.arguments;
        const calleePath = path.get("callee");
        const declarePath = path.findParent((p)=>p.isVariableDeclaration())
        if(declarePath){
          declarePath.node && declarePath.node.declarations.forEach((d)=>{
            if(d.init===path.node){
              declarePath.insertAfter(
                t.callExpression(t.identifier(`${calleePath.node.name}_constructor`),[t.identifier(`${d.id.name}`)].concat(args)),
              );
            }
          })
        }else {
          path.replaceWith(
            t.callExpression(t.identifier(`${calleePath.node.name}_constructor`),[path.node].concat(args)),
          );
          path.shouldStop = true;
        }
      }
    }
  };
}