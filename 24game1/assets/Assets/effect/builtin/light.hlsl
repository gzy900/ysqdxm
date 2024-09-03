

#ifndef __LIGHT_HLSL_
    #define __LIGHT_HLSL_

    struct Light{
        half3 direction;
        half attenuation;
    };

    float getLightAttenuation(in float dist, in float4 lightAttenuation) {
        float c = lightAttenuation.x;
        float l = lightAttenuation.y * dist;
        float quadratic = lightAttenuation.z * dist * dist;
        return 1.0 / (c + l + quadratic);
    }
    void precomputeSpot(in float3 normal, in float3 viewVertex, in float3 lightViewDirection, in float4 lightAttenuation, in float3 lightViewPosition, 
    in float lightSpotCutOff, in float lightSpotBlend, out float attenuation, out float3 eyeLightDir, out float dotNL) {
        eyeLightDir = lightViewPosition - viewVertex;
        float dist = length(eyeLightDir);
        eyeLightDir = dist > 0.0 ? eyeLightDir / dist : float3( 0.0, 1.0, 0.0 );
        float cosCurAngle = dot(-eyeLightDir, lightViewDirection);
        float spot = cosCurAngle * smoothstep(0.0, 1.0, (cosCurAngle - lightSpotCutOff) / lightSpotBlend);
        dotNL = dot(eyeLightDir, normal);
        attenuation = spot * getLightAttenuation(dist, lightAttenuation);
    }
    void precomputePoint(in float3 normal, in float3 viewVertex, in float4 lightAttenuation, in float3 lightViewPosition, 
    out float attenuation, out float3 eyeLightDir, out float dotNL) {
        eyeLightDir = lightViewPosition - viewVertex;
        float dist = length(eyeLightDir);
        attenuation = getLightAttenuation(dist, lightAttenuation);
        eyeLightDir = dist > 0.0 ? eyeLightDir / dist :  float3( 0.0, 1.0, 0.0 );
        dotNL = dot(eyeLightDir, normal);
    }

    Light precomputePoint(in float3 fragPosWS, in float4 lightAttenuation, in float3 lightPosWS) {
        Light light = (Light)0;
        float3 lightDir = lightPosWS - fragPosWS;
        float dist = length(lightDir);
        lightDir = dist > 0.0 ? lightDir / dist : float3( 0.0, 1.0, 0.0 );
        float attenuation = getLightAttenuation(dist, lightAttenuation);
        
        light.direction = lightDir;
        light.attenuation = attenuation;

        return light;
    }


    // distance attenuation
    float distanceAttenuation(float distanceSqr, float2 distAtten)
    {
        float atten = rcp(distanceSqr);
        /*
        * 从80%Range开始smooth fade:
        *   fadeDistance = (0.8 * 0.8 *rangeSqr)
        *   smoothFactor = (rangeSqr - distanceSqr) / (rangeSqr - fadeDistance)
        * 简化为：
        *   smoothFactor = d2 * (-1/(0.36*r2)) + 1/0.36
        *   distAtten.x = -1/(0.36*r2), distAtten.y = 1/0.36
        */
        float smoothFactor = saturate(distanceSqr * distAtten.x + distAtten.y);
        return atten * smoothFactor;
    }

    // angle attenuation
    float angleAttenuation(float3 spotDir, float3 lightDir, half2 spotAtten)
    {
        /*
        * 线性spot atten: (SdotL - cosOutAngle)/(cosInnerAngle - cosOutAngle)
        * spotAtten.x = 1/(cosInnerAngle - cosOuterAngle)
        * spotAtten.y = (-cosOuterAngle * spotAtten.x)
        * 点光源 spotAtten.x = (0, 1) return 1;
        */
        half sol = dot(spotDir, lightDir);
        half atten = saturate(sol * spotAtten.x + spotAtten.y);
        return atten * atten;
    }

    Light GetAdditionalLight(float4 posWorld){

        Light light;
        #ifdef USING_DIRECTIONAL_LIGHT
            light.attenuation = 1.0;
            light.direction = _WorldSpaceLightPos0.xyz;
        #else 

            #if defined(SPOT)

            #else
                float3 lightPosWS = _WorldSpaceLightPos0.xyz;
                float4 lightAttenuation = float4(1.0, 0.0, 0.0, 0.0);
                light = precomputePoint(posWorld, lightAttenuation, lightPosWS);
            #endif
            // float3 lightPosWS = _WorldSpaceLightPos0.xyz;
            // float3 lightVec = lightPosWS - posWorld.xyz;
            // float distanceSqr = max(dot(lightVec, lightVec), HALF_MIN);

            // half3 lightDirection = half3(lightVec * rsqrt(distanceSqr));
            // half4 distanceAndSpotAtten = float4(0, 2.8, 0, 1);

            // // trick get light range
            // float4 lightCoord=mul(unity_WorldToLight, float4(posWorld.xyz, 1));
            // float range = length(lightVec) / length(lightCoord.xyz);

            // distanceAndSpotAtten.x = -2.8 /(range * range);
            // float atten = distanceAttenuation(distanceSqr, distanceAndSpotAtten.xy);
            
            // #if defined(SPOT)
            //     // trick get spot angle
            //     float cotanHalfSpotAngle = 2. * lightCoord.z / lightCoord.w;
            //     float outSpotAngle = atan(1/cotanHalfSpotAngle);
            //     float innerSpotAngle = outSpotAngle * 0.8;
            //     float cosInner = cos(innerSpotAngle);
            //     float cosOuter = cos(outSpotAngle);
            //     distanceAndSpotAtten.z = 1/(cosInner - cosOuter);
            //     distanceAndSpotAtten.w = -(cosOuter * distanceAndSpotAtten.z);
            //     // trick get spot direction
            //     float3 spotDirection = normalize(mul(float3(0,0,-1), (float3x3)unity_WorldToLight));
            //     atten = atten * angleAttenuation(spotDirection, lightDirection, distanceAndSpotAtten.zw);
            // #endif
            // light.direction = lightDirection;
            // light.attenuation = atten;
        #endif	

        return light;
    }

#endif // __LIGHT_HLSL_