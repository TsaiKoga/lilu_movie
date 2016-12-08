/*
 * renderProps.params是react-router中每个path所带的参数
 * renderProps.components是redux的容器组件，负责逻辑和数据的操作
 * renderProps.component.reduce可以得到容器组件,通过WrappedComponent获取到react-router当前访问的component
 * 所以把需要的action事件绑定在components的need中，这样就可以根据react-router获取对应的actions，从而改变state
 */
export function fetchComponentDataBeforeRender(dispatch, components, params) {
  const needs = components.reduce((prev, current) => {
    console.log("current:", current.WrappedComponent);
    return (current.need || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);
  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}
