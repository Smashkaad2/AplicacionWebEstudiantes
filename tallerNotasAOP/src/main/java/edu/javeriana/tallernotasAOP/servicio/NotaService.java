package edu.javeriana.tallernotasAOP.servicio;

import edu.javeriana.tallernotasAOP.excepcion.RegistroNoEncontradoException;
import edu.javeriana.tallernotasAOP.modelo.Nota;
import edu.javeriana.tallernotasAOP.repositorio.RepositorioNota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaService {

    @Autowired
    private RepositorioNota repositorioNota;

    public List<Nota> traerTodas() {
        return repositorioNota.findAll();
    }

    public Nota traeNota(Integer id) {
        return repositorioNota.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe nota con id: " + id));
    }

    public Nota creaNota(Nota nota) {
        return repositorioNota.save(nota);
    }

    public void borraNota(Integer id) {
        Nota notaBorrar = repositorioNota.findById(id).orElseThrow(() -> new RegistroNoEncontradoException("No existe la nota con id: " + id));
        repositorioNota.delete(notaBorrar);
    }

    public Nota actualizaNota(Integer id, Nota notaAc) {
        Nota notaActualizada = repositorioNota.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe la nota con el id: " + id));

        notaActualizada.setObservacion(notaAc.getObservacion());
        notaActualizada.setValor(notaAc.getValor());
        notaActualizada.setPorcentaje(notaAc.getPorcentaje());

        return repositorioNota.save(notaActualizada);
    }
}