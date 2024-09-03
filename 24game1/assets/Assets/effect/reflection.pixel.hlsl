#include <common.inc>

struct FVertexOutput
{
    float4 Position : SV_Position;
    float2 TexCoord : TEXCOORD0;
    float3 LightDir : TEXCOORD1;
    float3 ViewDir : TEXCOORD2;
    float3 WorldPosition : TEXCOORD3;
    LIGHTMAP_COORDS(4)
    FOG_COORDS(5)
    SHADOW_COORDS(6)
    float3 normalWS: TEXCOORD7;
};

cbuffer material
{
    float3 u_specularColor;
    float u_shininess;
    float4 u_diffuseColor;
    float u_diffuseIntensity;
    float3 u_emissionColor;
    float u_alphaTestValue;
    float4 _Color;
}

DECLARE_TEXTURE(u_diffuseTex);
DECLARE_TEXTURE(u_normalTex);
DECLARE_TEXTURE(u_emissionTex);


#define INVERSE_PI    0.318309891613572

float2 computeRealUV(float3 dir, float mip){

    float2 uv = float2(atan2(-dir.x, dir.z)*INVERSE_PI*0.5 +0.5, acos(-dir.y)*INVERSE_PI);

    float xtiling = pow(0.5, mip);
    float ytiling = pow (0.5, mip + 1);
    float yoffset = 1.0 - xtiling;
    float2 real_uv = float2(uv.x * xtiling, (1.0 - uv.y) * ytiling + yoffset);
    return float2(real_uv.x, real_uv.y);
}

fixed RoughnessToMipmapLevel(fixed roughness)
{
    uint mipMapCount = 6;
    roughness = roughness * (1.7 - 0.7 * roughness);
    return roughness * mipMapCount;
}

half3 environmentReflection(half3 reflectVector, half perceptualRoughness)
{
    half lod = floor(RoughnessToMipmapLevel(perceptualRoughness));
    float2 uv = computeRealUV(reflectVector, 0);
    return SAMPLE_TEXTURE(u_environmentMap, uv).xyz;
}

float4 Main(in FVertexOutput In) : SV_Target0
{
    float3 normalWS = In.normalWS;
    float3 viewDirWS = In.ViewDir;
    half3 relfectVector = normalize(reflect(-viewDirWS, normalWS));
    float3 color = environmentReflection(relfectVector, 0.0);

    return float4(color, 1.0);
}

