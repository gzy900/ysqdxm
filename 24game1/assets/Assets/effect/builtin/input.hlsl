
#ifndef __INPUT_HLSL_
    #define __INPUT_HLSL_
    
    #include "utils.hlsl"
    #include "math.hlsl"

    struct PixelInput{
        float3 positionWS;
        fixed3 normalWS;
        fixed3 viewDirWS;
        fixed3 bakeGI;   
        fixed  shadowAtten; 
    };
    
    void InitPixelInput(FVertexOutput input, fixed3 normalTS, inout PixelInput pixelInput){
        pixelInput.positionWS = input.positionWS.xyz;
        pixelInput.viewDirWS = SafeNormalize(input.viewDirWS);

        // normal
        #if defined(USE_NORMAL_MAP)
            half3x3 TBN = half3x3(input.tangentWS, input.bitangentWS, input.normalWS);
            pixelInput.normalWS = TransformTangentToWorld(normalTS, TBN);
            pixelInput.normalWS = SafeNormalize(pixelInput.normalWS);
        #else
            pixelInput.normalWS = input.normalWS;
            pixelInput.normalWS = SafeNormalize(pixelInput.normalWS);
        #endif

        // shadow
        pixelInput.shadowAtten = SHADOW_ATTENUATION(input);

        // gi
        #ifdef LIGHTMAP_ON
            fixed3 lightMapColor = SAMPLE_LIGHTMAP(input);
            pixelInput.bakeGI = MixLightmapWithRealtimeAttenuation(lightMapColor, pixelInput.shadowAtten, pixelInput.normalWS);
        #else
            pixelInput.bakeGI = MyShadeSH9(pixelInput.normalWS);
        #endif
    }

#endif