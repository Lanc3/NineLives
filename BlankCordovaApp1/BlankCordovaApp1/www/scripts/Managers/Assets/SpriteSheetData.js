class SpriteSheetData extends Texture
{
    constructor(type, path, name, texture, textureWidth, textureHeight, jsonData)
    {
        super(type, path, name, texture, textureWidth, textureHeight);
        this.jsonData = jsonData;
    }
}