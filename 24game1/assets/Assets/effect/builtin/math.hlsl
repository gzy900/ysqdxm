#ifndef __MATH_HLSL_
    #define __MATH_HLSL_

    #define HALF_MIN 6.103515625e-5
    fixed3 TransformTangentToWorld(fixed3 vectorTS, fixed3x3 tangentToWorld)
    {
        return mul(tangentToWorld, vectorTS);
    }

    // fixed3 SafeNormalize(fixed3 inVec)
    // {
    //     fixed3 dp3 = max(HALF_MIN, dot(inVec, inVec));
    //     return inVec * rsqrt(dp3);
    // }


#endif