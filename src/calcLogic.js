export const but = ['CLEAR', '=', 'MR', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, ',', '+', '-', '*', '/']

export const isNumeric = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

export const validateMemory = (n) => {
    if(isNumeric(n)){
   /*   if(n - n.toFixed(6) !== 0){
        return n.toFixed(6)
      } else if(n > 1000000 ) {
        return n.toExponential()
      } else {
        return n
      }
    } else { */
      return 'M_ERROR'
    }      
  }


  
export const calculate = (a, b, action) => {
  let x = parseFloat(a)
  let y = parseFloat(b)
    const act = {
      '/': (a, b) => a / b,
      '*': (a, b) => a * b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
    }
    if(x && y && isNumeric(x) && isNumeric(y)){
      if(x < 1 && y < 1){
        let result = act[action](parseFloat(x), parseFloat(y))
        if(/0{5}/.test(+result) ){
          let num = result.toString().length - result.toString().match(/0/g).length
          console.log(num)
          return result.toFixed(num)
        }
      }
     return act[action](x, y) 
    } else {
      return 'EVAL_ERROR'
    }
  }