class Texture extends Asset
{
    constructor(type, path, name , texture, textureWidth ,textureHeight)
    {
        super(type,path,name);
        this.width = textureWidth;
        this.height = textureHeight;
        this.texture = texture;
    }
}