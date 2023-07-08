

const mixedElements = [6, 1, 'Rayo', 1, 'vallecano', '10', 'upgrade', 8, 'hub'];

function averageWord(param) {
    let sumValor = 0;

    for (let i = 0; i < param.length; i++) {
        if(typeof param[i] == 'string') {
            sumValor += param[i].length;
        }
        else {
            sumValor += param[i];
        }
    }   
    return sumValor
}

console.log(averageWord(mixedElements))