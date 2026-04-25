import { User } from "../models/user.models.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { uploadonCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    }
    catch (error) {
        throw new ApiError(500, "something went wrong while generating accesstoken and refresh token")
    }
}


const registerUser = asyncHandler(async (req, res) => {

    const { username, email, phone, password } = req.body

    if ([username, email, phone, password].some((field) =>
        field?.trim() === ""
    )) {
        throw new ApiError(500, "not all details provided")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }, { phone }]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists")
    }

    const coverimagepath = req.files?.coverimage?.[0]?.path;

    if (!coverimagepath) {
        throw new ApiError(409, "coverimage not found")
    }

    const coverimage = await uploadonCloudinary(coverimagepath)

    if (!coverimage) {
        throw new ApiError(410, "coverimage is not uploaded")
    }

    const user = await User.create({
        username,
        email,
        phone,
        coverimage: coverimage?.url || "",
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(403, "error while registering user ")
    }

    return res
        .status(200)
        .json(
            {
                success: true,
                message: "user registered successfully",
                data: createdUser
            }
        );
})

const loginUser = asyncHandler(async (req, res) => {

    console.log(req.body)
    const { email, phone, password } = req.body;
    if (!(email || phone)) {
        return res
            .status(403)
            .json(
                new ApiError(403, "email or phone required")
            )
    }

    const user = await User.findOne({
        $or: [{ email }, { phone }]
    })

    if (!user) {
        throw new ApiError(406, "user not found")
    }

    const ispasswordvalid = await user.isPasswordCorrect(password)
    if (!ispasswordvalid) {
        throw new ApiError(404, "password is invalid");
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
    const loggedinUSer = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedinUSer, accessToken, refreshToken
                },

                "User logged in succesfully"

            )
        )

})


const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken


    if (!incomingRefreshToken) {
        throw new ApiError(401, "unauthorized request ")

    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used ")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accessToken, newrefreshToken } = await generateAccessAndRefreshTokens(user._id)

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newrefreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken, refreshToken: newrefreshToken
                    },
                    "Access Toke refresh successfully"
                )

            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token")

    }
})



const changepassword = asyncHandler(async (req, res) => {
    const { current_password, new_password } = req.body;

    const user = await User.findById(req.user?._id)
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    console.log(user);
    const isPasswordvalid = await user.isPasswordCorrect(current_password)

    if (!isPasswordvalid) {
        throw new ApiError(410, "wrong password")

    }
    if (new_password.trim() === "") {
        return res
            .status(403)
            .json(

                new ApiResponse(
                    403,
                    {
                    },
                    "new password can not be empty string"

                )
            )
    }

    user.password = new_password

    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "password changed successfully"
            )
        )
})


const changecoverimage = asyncHandler(async (req, res) => {
    const coverimagepath = req.files?.coverimage?.[0]?.path;
    console.log (req.files);
    if (!coverimagepath) {
        throw new ApiError(407, "image path not found")
    }

    const coverimage = await uploadonCloudinary(coverimagepath)


    if (!coverimage?.url) {
        throw new ApiError(410, "failed to upload coverimage")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id, {

        $set: {
            coverimage: coverimage.url
        }

    },
        {
            new: true
        }
    ).select("-password")

    if(!user){
        throw new ApiError(404,"user not found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            {},
            "cover image updated successfully"
        )
    )

})


export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changepassword,
    changecoverimage
}