class UIContainer
{
    constructor(name)
    {
        // make the div
        let div = document.createElement("div");
        div.id = name;
        this.name = name;
        // assign it a CSS class
        div.className = "floating-div";
        this.container = div;
    }
    addToContainer(DOMobject)
    {
        this.container.appendChild(DOMobject);
    }
}