#ifndef __TRANSPARENT_HLSL_
    #define __TRANSPARENT_HLSL_

    #include "utils.hlsl"
    
    struct PixelInput{
        float3 positionWS;
        fixed3 normalWS;
        fixed3 viewDirWS;
        fixed3 bakeGI;   
    };
    
    void InitPixelInput(FVertexOutput input, inout PixelInput pixelInput){
        pixelInput.positionWS = input.positionWS.xyz;
        pixelInput.viewDirWS = normalize(input.viewDirWS);

        // normal
        pixelInput.normalWS = input.normalWS;
        pixelInput.normalWS = normalize(pixelInput.normalWS);

        // gi
        pixelInput.bakeGI = MyShadeSH9(pixelInput.normalWS);
    }

    // material
    struct Material{
        float3 albedo;
        float  alpha;
        float3 emission;
        float  metallic;
        float  roughness;
        float  f0;
    };

    float4 getMaterialEmitAlpha(float2 uv) {
        float4 texColor = SAMPLE_TEXTURE(_EmissionMap, uv);
        float3 emitColor = uEmitColorFactor * sRGBToLinear(texColor.rgb);
        
        float alpha = texColor.a;
        alpha *= uOpacityFactor;

        return float4(emitColor, alpha);
    }

    float getMaterialF0() {
        return uSpecularF0Factor;
    }

    float getMaterialRoughness() {
        return uRoughnessPBRFactor;
    }

    float getMaterialMetalness() {
        return uMetalnessPBRFactor;
    }

    float3 getMaterialAlbedo() {
        float3 albedo;
        albedo = uAlbedoPBRFactor * (SAMPLE_TEXTURE(_MainTex, float2(0.125, 0.5)).rgb);
        return albedo;
    }

    void InitMaterial(float2 uv, inout Material material){
        // emission
        float4 emitAlpha = getMaterialEmitAlpha(uv);
        material.emission = emitAlpha.rgb;

        // alpha
        material.alpha = emitAlpha.a;
        if (material.alpha == 0.0) discard;

        // f0
        float f0 = 0.08 * getMaterialF0();
        material.f0 = f0;

        // metallic
        material.metallic = getMaterialMetalness();

        // roughness
        material.roughness = getMaterialRoughness();

        // albedo
        material.albedo = getMaterialAlbedo();
    }

    struct GBufferData{
        float3 diffuseColor;
        float3 specularColor;
        float3 normalWS;
        float  roughness;
        float F90;
    };

    void InitGBuffer(float3 normalWS, in Material mat, inout GBufferData gbuffer){
       
        float3 specularColor = lerp(float3(mat.f0, mat.f0, mat.f0), mat.albedo, mat.metallic);
        float3 diffuseColor = mat.albedo * (1.0 - mat.metallic);
        float F90 = clamp(50.0 * specularColor.g, 0.0, 1.0);

        gbuffer.diffuseColor = diffuseColor;
        gbuffer.specularColor = specularColor;
        gbuffer.normalWS = normalWS;
        gbuffer.F90 = F90;
        gbuffer.roughness = mat.roughness;
    }

#endif