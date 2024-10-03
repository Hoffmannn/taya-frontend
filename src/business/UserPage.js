import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { actions } from "../reducers/user.actions";
import {
  actions as routeActions,
  types as routes,
} from "../reducers/routes.actions";
import { ControlledTextField, ZipCodeTextField } from "../components/inputs";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { getCEP } from "../api/cep";
import { ArrowBack } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers";

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.user);
  const rules = {};
  const initialValues = {
    nome: "",
    dataNascimento: "",
    cep: "",
    cidade: "",
    uf: "",
    ...data,
  };
  const formProps = {
    ...useForm(),
    rules,
    initialValues,
  };

  const handleZipcodeChange = (e) => {
    formProps.setValue("cep", e.target.value);
  };

  const handleCEPSearch = async () => {
    await getCEP(formProps.getValues("cep")).then((res) => {
      if (res?.data) {
        formProps.setValue("cidade", res.data.localidade);
        formProps.setValue("uf", res.data.uf);
      }
    });
  };
  const handleSubmit = (values) => {
    dispatch(actions.saveUser.request(values));
  };

  if (loading) {
    return <div>Carregando usuário</div>;
  }

  return (
    <>
      <Box flexDirection="row" display="flex">
        <IconButton>
          <ArrowBack
            onClick={() => dispatch(routeActions.redirectTo(routes.HOME))}
          />
        </IconButton>
        <Typography variant="h4">Editar usuário</Typography>
      </Box>
      <Paper style={{ width: "fit-content", padding: 20 }}>
        <form
          onSubmit={formProps.handleSubmit(handleSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <ControlledTextField
            label="Nome"
            name={"nome"}
            formProps={formProps}
          />
          <DatePicker
            label="Data de Nascimento"
            name={"dataNascimento"}
            format="DD/MM/YYYY"
            onChange={(e) => formProps.setValue("dataNascimento", e)}
          />
          <ZipCodeTextField
            name={"cep"}
            label="CEP"
            onChange={handleZipcodeChange}
            onBlur={handleCEPSearch}
            customInput={TextField}
          />

          <ControlledTextField
            label="Cidade"
            name={"cidade"}
            formProps={formProps}
            InputLabelProps={{ shrink: true }}
          />
          <ControlledTextField
            label="UF"
            name={"uf"}
            formProps={formProps}
            InputLabelProps={{ shrink: true }}
          />
          <Button type="submit" variant="contained" onClick={handleSubmit}>
            Salvar
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default UserPage;
