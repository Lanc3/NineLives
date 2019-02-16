class Texture extends Asset
{
    constructor(type, path, texture, textureWidth,textureHeight)
    {
        super(type);
        this.width = textureWidth;
        this.height = textureHeight;
        this.sourcePath = path;
        this.texture = texture;
    }
}