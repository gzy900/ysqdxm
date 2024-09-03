#ifndef __UTILS_HLSL_
    #define __UTILS_HLSL_

    float3 myComputeDiffuseSHLight(float3 normal, in float3 sh[9]) {
        return sh[0] +
        sh[1] * (normal.y) +
        sh[2] * (normal.z) +
        sh[3] * (normal.x) +
        sh[4] * (normal.y * normal.x) +
        sh[5] * (normal.y * normal.z) +
        sh[6] * ((3.0 * normal.z * normal.z) - 1.0) +
        sh[7] * (normal.z * normal.x) +
        sh[8] * (normal.x * normal.x - (normal.y * normal.y));
        
    }

    float3 MyShadeSH9(float3 normal){
        normal.x = -normal.x;
        return myComputeDiffuseSHLight(normal, u_SH);
    }

    // // from UnityGlobalIllumination.cginc
    // inline half3 MixLightmapWithRealtimeAttenuation(half3 lightmap, half attenuation, half3 normalWorld)
    // {
    //     // Let's try to make realtime shadows work on a surface, which already contains
    //     // baked lighting and shadowing from the main sun light.
    //     half3 shadowColor = unity_ShadowColor.rgb;
    //     half shadowStrength = _LightShadowData.x;

    //     // Summary:
    //     // 1) Calculate possible value in the shadow by subtracting estimated light contribution from the places occluded by realtime shadow:
    //     //      a) preserves other baked lights and light bounces
    //     //      b) eliminates shadows on the geometry facing away from the light
    //     // 2) Clamp against user defined ShadowColor.
    //     // 3) Pick original lightmap value, if it is the darkest one.


    //     // 1) Gives good estimate of illumination as if light would've been shadowed during the bake.
    //     //    Preserves bounce and other baked lights
    //     //    No shadows on the geometry facing away from the light
    //     half ndotl = saturate(dot(normalWorld, _WorldSpaceLightPos0.xyz));
    //     half3 estimatedLightContributionMaskedByInverseOfShadow = ndotl * (1 - attenuation) * _LightColor0.rgb;
    //     half3 subtractedLightmap = lightmap - estimatedLightContributionMaskedByInverseOfShadow;

    //     // 2) Allows user to define overall ambient of the scene and control situation when realtime shadow becomes too dark.
    //     half3 realtimeShadow = max(subtractedLightmap, shadowColor);
    //     realtimeShadow = lerp(realtimeShadow, lightmap, shadowStrength);

    //     // 3) Pick darkest color
    //     return min(lightmap, realtimeShadow);
    // }

    inline half3 ReadNormal(half4 color)
    {
        half2 normalxy = (color.rg - 0.5f)*2.0f;
        half normalz = sqrt(max(1e-3, 1.0f - dot(normalxy, normalxy)));
        return half3(normalxy, normalz);
    }

    float linearTosRGB(in float color) {
        return  color < 0.0031308 ? color * 12.92 : 1.055 * pow(color, 1.0/2.4) - 0.055;
    }
    float3 linearTosRGB(in float3 color) {
        return float3( color.r < 0.0031308 ? color.r * 12.92 : 1.055 * pow(color.r, 1.0/2.4) - 0.055, color.g < 0.0031308 ? color.g * 12.92 : 1.055 * pow(color.g, 1.0/2.4) - 0.055, color.b < 0.0031308 ? color.b * 12.92 : 1.055 * pow(color.b, 1.0/2.4) - 0.055);
    }
    float4 linearTosRGB(in float4 color) {
        return float4( color.r < 0.0031308 ? color.r * 12.92 : 1.055 * pow(color.r, 1.0/2.4) - 0.055, color.g < 0.0031308 ? color.g * 12.92 : 1.055 * pow(color.g, 1.0/2.4) - 0.055, color.b < 0.0031308 ? color.b * 12.92 : 1.055 * pow(color.b, 1.0/2.4) - 0.055, color.a);
    }
    float sRGBToLinear(in float color) {
        return  color < 0.04045 ? color * (1.0 / 12.92) : pow((color + 0.055) * (1.0 / 1.055), 2.4);
    }
    float3 sRGBToLinear(in float3 color) {
        return float3( color.r < 0.04045 ? color.r * (1.0 / 12.92) : pow((color.r + 0.055) * (1.0 / 1.055), 2.4), color.g < 0.04045 ? color.g * (1.0 / 12.92) : pow((color.g + 0.055) * (1.0 / 1.055), 2.4), color.b < 0.04045 ? color.b * (1.0 / 12.92) : pow((color.b + 0.055) * (1.0 / 1.055), 2.4));
    }
    float4 sRGBToLinear(in float4 color) {
        return float4( color.r < 0.04045 ? color.r * (1.0 / 12.92) : pow((color.r + 0.055) * (1.0 / 1.055), 2.4), color.g < 0.04045 ? color.g * (1.0 / 12.92) : pow((color.g + 0.055) * (1.0 / 1.055), 2.4), color.b < 0.04045 ? color.b * (1.0 / 12.92) : pow((color.b + 0.055) * (1.0 / 1.055), 2.4), color.a);
    }

    // float3x3 LUVInverse = float3x3( 6.0013, -2.700, -1.7995, -1.332, 3.1029, -5.7720, 0.3007, -1.088, 5.6268 );
    
    // float3 LUVToRGB( in float4 vLogLuv ) {
    //     float Le = vLogLuv.z * 255.0 + vLogLuv.w;
    //     float3 Xp_Y_XYZp;
    //     Xp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);
    //     Xp_Y_XYZp.z = Xp_Y_XYZp.y / vLogLuv.y;
    //     Xp_Y_XYZp.x = vLogLuv.x * Xp_Y_XYZp.z;
    //     float3 vRGB = mul(Xp_Y_XYZp, LUVInverse);
    //     return max(vRGB, 0.0);
    // }

    float pow4(float val){
        float p2 = val * val;
        return p2*p2;
    }

#endif