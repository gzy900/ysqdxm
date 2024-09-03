
#include <common.inc>

// varying define
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

#include "./builtin/math.hlsl"


void Main(in FEffect3DVertexInput In, out FVertexOutput Out)
{
    FVertexProcessOutput VPOut;
    Effect3DVertexProcess(In, VPOut);

    float4 positionWS = ObjectToWorldPosition(VPOut.Position);
    Out.positionWS = positionWS;
    Out.position = WorldToClipPosition(positionWS);
    Out.uv = TRANSFER_TEXCOORD(In.TexCoord, _MainTex_ST);
    Out.normalWS = ObjectToWorldNormal(VPOut.Normal);
    
    Out.viewDirWS = SafeNormalize(WorldSpaceViewPosition.xyz - positionWS.xyz);
}
