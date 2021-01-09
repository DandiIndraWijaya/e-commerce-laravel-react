export const currencyFormatter = (money) => {
    if (money != undefined){
        return money.toLocaleString('us-US', {
            style: 'currency',
            currency: 'USD'
        }).slice(0, -3)
    }else{
        console.error('Parameter is undefined or null, parameter val: ', money)
    }
}