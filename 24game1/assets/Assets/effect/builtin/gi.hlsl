#ifndef _GI_HLSL_
    #define _GI_HLSL_
    #include "utils.hlsl"

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

    half3 environmentReflection(half3 reflectVector, half perceptualRoughness, float ao)
    {
        half lod = floor(RoughnessToMipmapLevel(perceptualRoughness));
        float2 uv = computeRealUV(reflectVector, lod);
        return SAMPLE_TEXTURE(u_environmentMap, uv).xyz * ao;
    }

    half3 computeIBLSpecularUnity(float3 viewDirWS, float3 normalWS, float roughness, float ao, float3 specular, float reflectivity){
        
        half3 relfectVector = normalize(reflect(-viewDirWS, normalWS));
        float3 prefiltedColor = environmentReflection(relfectVector, roughness, ao);

        float roughness2 = roughness * roughness;
        float roughness4 = roughness2 * roughness2;
        float surfaceReduction = 1.0 / (roughness4 + 1.0);
        float fresnelTerm = pow4(1.0 - saturate(dot(normalWS, viewDirWS)));
        float grazingTerm = saturate(1.0 - roughness + reflectivity);
        
        float3 iblResult = surfaceReduction * prefiltedColor * lerp(specular, grazingTerm, fresnelTerm);

        return sRGBToLinear(iblResult);
    }

    // frontNormal objectNormal
    void IndirectLighting(float3 normalWS, float3 viewDirWS,float3 bakeGI, float3 diffuseColor, float3 specularColor, 
    float ao, float roughness,float reflectivity, inout float3 diffuse, inout float3 specular){
        // sh diffuse
       diffuse += (bakeGI * diffuseColor * ao);

        // ibl specular
        specular = computeIBLSpecularUnity(viewDirWS, normalWS, roughness, ao, specularColor, reflectivity);
    }

#endif