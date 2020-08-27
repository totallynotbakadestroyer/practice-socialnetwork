package com.bakadestroyer.simplesocialnetwork;

import com.bakadestroyer.simplesocialnetwork.controllers.UsersController;
import com.bakadestroyer.simplesocialnetwork.dataaccess.UserRepository;
import com.bakadestroyer.simplesocialnetwork.models.User;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.hamcrest.Matchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class UsersControllerTest {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UsersController usersController;

    @Test
    public void When_EmailIsIncorrect_Expect_BadRequest() throws Exception {
        User user = new User("anton", "rasrasras", "how", "yes");
        String body = objectMapper.writeValueAsString(user);

        mvc.perform(post("/api/users/signup")
        .contentType("application/json")
        .content(body))
        .andExpect(status().isBadRequest());

    }

    @Test
    public void When_EmailWithNoDot_Expect_BadRequest() throws  Exception {
        User user = new User("anton@chehovcom", "rasrasras", "how", "yes");
        String body = objectMapper.writeValueAsString(user);

        mvc.perform(post("/api/users/signup")
                .contentType("application/json")
                .content(body))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void When_PasswordIsIncorrect_Expect_BadRequest() throws Exception {
        User user = new User("anton@chehov.com", "rasras", "how", "yes");
        String body = objectMapper.writeValueAsString(user);

        mvc.perform(post("/api/users/signup")
                .contentType("application/json")
                .content(body))
                .andExpect(status().isBadRequest());

    }
}
