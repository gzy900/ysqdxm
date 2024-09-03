
#include <common.inc>

struct FVertexOutput
{
    float4 position : SV_Position;
    float2 uv : TEXCOORD0;
    float4 positionWS: TEXCOORD1;
    float3 normalWS: TEXCOORD2;
    float3 viewDirWS: TEXCOORD3;
};

cbuffer Material
{
    float  uAlbedoPBRFactor;
    float  uEmitColorFactor;
    float  uOpacityFactor;
    float  uSpecularF0Factor;
    float4 uRoughnessPBRFactor;
    float4 uMetalnessPBRFactor;
    float4 uEnvironmentExposure;
    float4 _MainTex_ST;
}


DECLARE_TEXTURE(_MainTex);
DECLARE_TEXTURE(_EmissionMap);

#include "./builtin/transparentLit.hlsl"
#include "./builtin/gi.hlsl"

float4 Main(in FVertexOutput In) : SV_Target0
{
    Material material = (Material)0;
    InitMaterial(In.uv, material);

    PixelInput pixelInput = (PixelInput)0;
    InitPixelInput(In, pixelInput);

    GBufferData gbuffer = (GBufferData)0;
    InitGBuffer(pixelInput.normalWS, material, gbuffer);

    float3 diffuse = float3(0.0, 0.0, 0.0);
    float3 specular = float3(0.0, 0.0, 0.0);
    
    IndirectLighting(pixelInput.normalWS, pixelInput.viewDirWS, pixelInput.bakeGI, gbuffer.diffuseColor, 
	gbuffer.specularColor, 1.0, gbuffer.roughness, 0.0, diffuse, specular);

    diffuse *= uEnvironmentExposure;
    specular *= uEnvironmentExposure;
    
    float3 frag = diffuse + specular + material.emission;
    frag = frag * material.alpha;
    
    float4 finalColor = float4(diffuse, material.alpha);
    finalColor = linearTosRGB(finalColor);
				
	return finalColor;
}
