package ir.sbra.usermanagement.user;

import ir.sbra.dto.SignupRequest;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserEntity singupRequestDtoToUserInfo(SignupRequest signupRequest);
    SignupRequest userInfoToSignupRequest(UserEntity userInfo);

}
