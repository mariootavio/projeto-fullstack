import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Client } from "../types/client";

const API_URL = "http://localhost:3001/api/clients";

const ClientForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // se existir, estamos editando

  const isEditMode = !!id;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",
  });

  useEffect(() => {
    if (isEditMode) {
      axios
        .get<Client>(`${API_URL}/${id}`)
        .then((res) => {
          const { name, email, phone, cpf } = res.data;
          setForm({ name, email, phone, cpf });
        })
        .catch((err) => {
          alert("Erro ao carregar cliente.");
          console.error(err);
        });
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`${API_URL}/${id}`, form);
        alert("Cliente atualizado com sucesso!");
      } else {
        await axios.post(API_URL, form);
        alert("Cliente cadastrado com sucesso!");
      }
      navigate("/clients");
    } catch (error) {
      alert("Erro ao salvar cliente");
      console.error(error);
    }
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h1>{isEditMode ? "Editar Cliente" : "Novo Cliente"}</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          name="name"
          placeholder="Nome"
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Telefone"
          value={form.phone}
          onChange={handleChange}
        />
        <input
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
        />
        <button type="submit">
          {isEditMode ? "Salvar Alterações" : "Cadastrar Cliente"}
        </button>
      </form>
    </div>
  );
};

export default ClientForm;
