#ifndef _LIT_HLSL_
    #define _LIT_HLSL_
    #include "gbuffer.hlsl"
    #include "input.hlsl"

    float4 precomputeGGX(in float3 normal, in float3 eyeVector, in float roughness) {
        float NoV = clamp(dot(normal, eyeVector), 0.0, 1.0);
        float r2 = roughness * roughness;
        return float4(r2, r2 * r2, NoV, NoV * (1.0 - r2));
    }

    float D_GGX(float4 precomputeGGX, float NoH) {
        float a2 = precomputeGGX.y;
        float d = (NoH * a2 - NoH) * NoH + 1.0;
        return a2 / (3.141593 * d * d);
    }

    float3 F_Schlick(float3 f0, float f90, in float VoH) {
        float VoH5 = pow(1.0 - VoH, 5.0);
        return f90 * VoH5 + (1.0 - VoH5) * f0;
    }
    float F_Schlick(float f0, float f90, in float VoH) {
        return f0 + (f90 - f0) * pow(1.0 - VoH, 5.0);
    }

    float V_SmithCorrelated(float4 precomputeGGX, float NoL) {
        float a = precomputeGGX.x;
        float smithV = NoL * (precomputeGGX.w + a);
        float smithL = precomputeGGX.z * (NoL * (1.0 - a) + a);
        return 0.5 / (smithV + smithL);
    }

    float3 specularLobe(float4 precomputeGGX, float3 normal, float3 eyeVector, float3 eyeLightDir, float3 specular, float NoL, float f90) {
        float3 H = normalize(eyeVector + eyeLightDir);
        float NoH = clamp(dot(normal, H), 0., 1.);
        float VoH = clamp(dot(eyeLightDir, H), 0., 1.);
        float D = D_GGX(precomputeGGX, NoH);
        float V = V_SmithCorrelated(precomputeGGX, NoL);
        float3 F = F_Schlick(specular, f90, VoH);
        return (D * V * 3.141593) * F;
    }

    void computeLightLambertGGX( in float3 normal, in float3 eyeVector, in float NoL, in float4 precomputeGGX, in float3 diffuse, 
    in float3 specular, in float attenuation, in float3 lightColor, in float3 eyeLightDir, in float f90, 
    out float3 diffuseOut, out float3 specularOut, out bool lighted) {
        lighted = NoL > 0.0;
        if (lighted == false) {
            specularOut = diffuseOut = float3(0.0, 0.0, 0.0);
            return;
        }
        float3 colorAttenuate = attenuation * NoL * lightColor;
        specularOut = colorAttenuate * specularLobe(precomputeGGX, normal, eyeVector, eyeLightDir, specular, NoL, f90);
        diffuseOut = colorAttenuate * diffuse;
    }

    void DirectLighting(GBufferData gbuffer, PixelInput input, float3 lightDirWS, float3 lightColor, float attenuation, inout float3 diffuse, inout float3 specular){
        
        float3 lightDiffuse = float3(0,0,0);
        float3 lightSpecular = float3(0,0,0);
        
        float3 normalWS = gbuffer.normalWS;
        float3 viewDirWS = input.viewDirWS;
        float dotNL = saturate(dot(normalWS, lightDirWS));
        bool lighted;
        float4 prepGGX = precomputeGGX(normalWS, viewDirWS, max(0.045, gbuffer.roughness));

        computeLightLambertGGX(normalWS, viewDirWS, dotNL, prepGGX, gbuffer.diffuseColor, gbuffer.specularColor, attenuation, lightColor, lightDirWS, gbuffer.F90, lightDiffuse, lightSpecular, lighted);

        diffuse = saturate(lightDiffuse);
        specular = saturate(lightSpecular);
    }

    

#endif