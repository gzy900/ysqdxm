#ifndef _GBUFFER_DATA_HLSL_
    #define _GBUFFER_DATA_HLSL_
    
    #include "material.hlsl"
    #define kDieletricSpec half4(0.04, 0.04, 0.04, 1.0 - 0.04)
    half OneMinusReflectivityMetallic(half metallic)
    {
        half oneMinusDielectricSpec = kDieletricSpec.a;
        return oneMinusDielectricSpec - metallic * oneMinusDielectricSpec;
    }

    struct GBufferData{
        float3 diffuseColor;
        float3 specularColor;
        float3 normalWS;
        float  roughness;
        float  ao;
        float F90;
        float reflectivity;
    };

    void InitGBuffer(float3 normalWS, in Material mat, inout GBufferData gbuffer){
        #if defined(SPECULAR_WORKFLOW)
            
        #else
            float3 f0 = float3(0.08, 0.08, 0.08);
            gbuffer.diffuseColor = mat.albedo * (1.0 - mat.metallic);
            gbuffer.specularColor = lerp(f0, mat.albedo, mat.metallic);
            gbuffer.F90 = clamp(50.0 * gbuffer.specularColor.g, 0.0, 1.0);
            gbuffer.roughness = mat.roughness;
        #endif

        gbuffer.normalWS = normalWS;
        gbuffer.ao = mat.ao;
        half oneMinusReflectivity = OneMinusReflectivityMetallic(mat.metallic);
        gbuffer.reflectivity = 1.0 - oneMinusReflectivity;
    }

#endif