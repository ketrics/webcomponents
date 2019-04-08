export default class KetricsElement extends HTMLElement{
    props = {}

    constructor() {
        super();
        this.root = this.attachShadow({mode: 'open'});
    }

    connectedCallback(){
        this.render();
    }

    render(template){
        this.root.innerHTML = template.innerHTML;
    }

    static get defaultProps(){
        return {}
    }

    static get observedAttributes() {
        let attributes=[]
        for(let prop in this.defaultProps){
            attributes.push(prop)
        }
        return attributes;
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        let defaultProps= this.constructor.defaultProps;

        if (defaultProps[attrName]!==undefined) {
            let prop = defaultProps[attrName];

            switch (prop.type) {
                case 'object':
                    this.props[attrName] = JSON.parse(newVal)
                    break;
                default:
                    this.props[attrName] = newVal;
                    break;
            }

            this.render();
        }
    }

    validateProps(){
        let defaultProps= this.constructor.defaultProps;
        let error=false;

        for(let propName in defaultProps){
            let prop = defaultProps[propName];
            if ((prop.required !== undefined && prop.required===true) && this.props[propName]===undefined)
                return true;
        }
        return !error;
    }
}
