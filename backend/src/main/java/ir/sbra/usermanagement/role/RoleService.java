package ir.sbra.usermanagement.role;

import ir.sbra.usermanagement.user.UserEntity;
import ir.sbra.utils.Enums;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public RoleEntity getRoleByName(Enums.RoleType roleName) {
        return roleRepository.findByName(roleName.name());
    }

    public void giveRolesToUser(UserEntity user, Set<RoleEntity> roles) {
        user.setRoles(roles);
    }

}
