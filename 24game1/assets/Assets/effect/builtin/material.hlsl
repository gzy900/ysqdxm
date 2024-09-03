#ifndef __MATERIAL_HLSL_
    #define __MATERIAL_HLSL_

    #include "utils.hlsl"


    // material
    struct Material{
        float3 albedo;
        float3 normalTS;
        float  ao;
        float  alpha;
        float3 emission;
        // #if defined(SPECULAR_WORKFLOW)
        float3 specular;
        float  smoothness;
        // #else
        float  metallic;
        float  roughness;
        // #endif
    };

    float adjustRoughnessNormalMap(float roughness, float3 normal) {
        float nlen2 = dot(normal, normal);
        if (nlen2 < 1.0) {
            float nlen = sqrt(nlen2);
            float kappa = (3.0 * nlen -  nlen2 * nlen) / (1.0 - nlen2);
            return min(1.0, sqrt(roughness * roughness + 1.0 / kappa));
        }
        return roughness;
    }

    float4 SampleMetalSpecGloss(float2 uv)
    {
        float4 specGloss;

        #if defined(USE_METALLIC_SPEC_MAP)
            #if defined(SPECULAR_WORKFLOW)
                specGloss = SAMPLE_TEXTURE(_SpecGlossMap, uv);
            #else
                specGloss = SAMPLE_TEXTURE(_MetallicGlossMap, uv);
                specGloss.rgb *= _Metallic; 
            #endif
            
            specGloss.a *= _Glossiness;
        #else
            #if defined(SPECULAR_WORKFLOW)
                specGloss.rgb = _SpecularColor.rgb;
            #else
                specGloss.rgb = _Metallic.rrr;
            #endif
            specGloss.a = _Glossiness;
        #endif

        return specGloss;
    }

    float4 GetMaterialAlbedoAlpha(float2 uv){
        float4 albedo = sRGBToLinear(SAMPLE_TEXTURE(_MainTex, uv));
        return albedo * _Color;
    }

    float3 GetMaterialNormal(float2 uv){
        float3 normalTS = half3(0, 0, 1);
        #if defined(USE_NORMAL_MAP)
            normalTS = ReadNormal(SAMPLE_TEXTURE (_NormalMap, uv));
        #endif
        return normalTS;
    }

    float GetMaterialAO(float2 uv){
        float ao = 1.0;
        #if defined(USE_AO_MAP)
            float occlusion = SAMPLE_TEXTURE(_OcclusionMap, uv).g;
            ao = lerp(1.0, occlusion, _OcclusionStrength);
        #endif
        return ao;
    }

    float3 GetMaterialEmissiveColor(float2 uv){
        float3 emission = _EmissionColor.rgb;
        #if defined(USE_EMISSIVE_MAP)
            float3 texColor = sRGBToLinear(SAMPLE_TEXTURE(_EmissionMap, uv).rgb);
            emission *= texColor.rgb;
        #endif
        return emission;
    }

    void InitMaterial(float2 uv, inout Material material){
        // albedo and alpha
        float4 matAlbedo = GetMaterialAlbedoAlpha(uv);
        material.albedo = matAlbedo.rgb;
        material.alpha = matAlbedo.a;

        // normal
        material.normalTS = GetMaterialNormal(uv);
        
        // metalness|specular && roughness|smoothness
        float4 specGloss = SampleMetalSpecGloss(uv);
        #if defined(SPECULAR_WORKFLOW)
            material.metallic = 1.0;
            material.specular = specGloss.rgb;
            material.smoothness = specGloss.a;
        #else
            material.metallic = specGloss.r;
            material.specular = float3(0.0, 0.0, 0.0);
            material.roughness = specGloss.a;
            material.roughness = adjustRoughnessNormalMap(material.roughness, material.normalTS);
        #endif

        // ao
        material.ao = GetMaterialAO(uv);

        // emissive color
        material.emission = GetMaterialEmissiveColor(uv);
    }

#endif