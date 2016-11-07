export function shadeColor2(color, percent) {   
    const f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

export function create2DArray(x, y){
    const _map = new Array(x)
    for (let i = 0; i < x; ++i) {
        _map[i] = new Array(y)
        for (let j = 0; j < y; ++j) {
            _map[i][j] = { isOpen: false, isClosed: false, isStart: false, isEnd: false, hVal: 0, fVal: 0 }
        }
    }
    return _map
}

export function costFunction(node1, node2) {
    return Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2))
}

export const red = '#FF0000'