
#include <common.inc>

// varying define
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

// #include "./builtin/math.hlsl"


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
    
    #if defined(USE_NORMAL_MAP)
        Out.tangentWS = ObjectToWorldNormal(VPOut.Tangent.xyz);
        Out.bitangentWS = cross(Out.tangentWS, Out.normalWS) * VPOut.Tangent.w;
    #endif

    TRANSFER_LIGHTMAP(In, Out);
    TRANSFER_SHADOW(Out, positionWS.xyz);
    TRANSFER_FOG(Out, positionWS.xyz);
}
