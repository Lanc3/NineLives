var UITypes = Object.freeze({"TEXT":1,"BUTTON":2,})
class UIManager {
    constructor()
    {
        // look up the divcontainer
        var divContainerElement = document.getElementById("divcontainer");

        // make the div
        var div = document.createElement("div");

        // assign it a CSS class
        div.className = "floating-div";

        // make a text node for its content
        var textNode = document.createTextNode("");
        div.appendChild(textNode);

        // add it to the divcontainer
        divContainerElement.appendChild(div);
        this.UIComponentList = [];
    }
    createContainer(name)
    {
        this.UIComponentList.push(new UIContainer(name));
    }
    addComponent(name, DOMObject)
    {
        this.UIComponentList.forEach(function (element) {
            if (element.name === name)
            {
                element.addToContainer(DOMObject);
            }
        });
    }
}