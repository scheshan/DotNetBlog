function validateRequired(value){
    return value;
}

class Validation{
    constructor(){
        this.rules = []
    }

    validator(){
        return this.validate.bind(this)
    }
    
    validate(values){
        const errors = {};

        _.map(this.rules, rule=>{
            if(errors[rule.field]){ //如果已经验证过，则跳过检查
                return;
            }

            let value = values[rule.field];
            if(!rule.action(value)){
                errors[rule.field] = rule.errorMessage;
            }
        })

        return errors;
    }

    addRequired(field, errorMessage){
        this.rules.push({field, errorMessage, action: validateRequired})
    }
}

module.exports = Validation;