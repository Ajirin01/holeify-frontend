class ArrayQuery{
    constructor(object){
        this.object = object
        // console.log('Array Query initialized')
        // console.log(object)
    }

    checkFields(item){
        let condition = true
        for (let i = 0; i < this.field_keys.length; i++) {
            condition = condition && (item[this.field_keys[i]] == this.field_values[i])
        }

        return condition
    }

    selectWhere(query){
        this.field_keys =  Object.keys(query)
        this.field_values = Object.values(query)

        const data = this.object.filter(item => {
            if(this.checkFields(item)){
                return item
            }
        })

        return data
    }
}