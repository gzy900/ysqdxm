
#include <common.inc>

struct FVertexOutput
{
    float4 position : SV_Position;
    float2 uv : TEXCOORD0;
    float4 positionWS: TEXCOORD1;
    float3 normalWS: TEXCOORD2;
    float3 viewDirWS: TEXCOORD3;

    #if defined(USE_NORMAL_MAP)
        float3 tangentWS: TEXCOORD4;
        float3 bitangentWS: TEXCOORD5;
    #endif

    LIGHTMAP_COORDS(6)
    FOG_COORDS(7)
    SHADOW_COORDS(8)
};

cbuffer Material
{
    float  _Cutoff;
    float  _Metallic;
    float  _Glossiness;
    float  _OcclusionStrength;
    float4 _Color;
    float4 _SpecularColor;
    float4 _EmissionColor;
    float4 _MainTex_ST;
}

DECLARE_TEXTURE(_MainTex);
DECLARE_TEXTURE(_NormalMap);
DECLARE_TEXTURE(_MetallicGlossMap);
DECLARE_TEXTURE(_SpecGlossMap);
DECLARE_TEXTURE(_OcclusionMap);
DECLARE_TEXTURE(_EmissionMap);

#include "./builtin/input.hlsl"
#include "./builtin/material.hlsl"
#include "./builtin/gbuffer.hlsl"
#include "./builtin/lit.hlsl"
#include "./builtin/gi.hlsl"

float4 Main(in FVertexOutput In) : SV_Target0
{
    Material material = (Material)0;
    InitMaterial(In.uv, material);

    PixelInput pixelInput = (PixelInput)0;
    InitPixelInput(In, material.normalTS, pixelInput);

    GBufferData gbuffer = (GBufferData)0;
    InitGBuffer(pixelInput.normalWS, material, gbuffer);

    float3 lightDirWS = WorldSpaceLightDir;
    float3 lightColor = LightColor.xyz;
    float lightAtten = 1.0;


    float3 diffuse = float3(0.0, 0.0, 0.0);
    float3 specular = float3(0.0, 0.0, 0.0);
    DirectLighting(gbuffer, pixelInput, lightDirWS, lightColor, lightAtten, diffuse, specular);

    diffuse *= pixelInput.shadowAtten;
    specular *= pixelInput.shadowAtten;
    
    IndirectLighting(pixelInput.normalWS, pixelInput.viewDirWS, pixelInput.bakeGI, gbuffer.diffuseColor, 
	gbuffer.specularColor, gbuffer.ao, gbuffer.roughness, gbuffer.reflectivity, diffuse, specular);

    float3 frag = diffuse + specular + material.emission;
    
    float4 finalColor = float4(frag, material.alpha);

    APPLY_FOG(In, finalColor);

    finalColor = linearTosRGB(finalColor);
				
	return finalColor;
}
