package edu.javeriana.tallernotasAOP.controlador;

import edu.javeriana.tallernotasAOP.excepcion.RegistroNoEncontradoException;
import edu.javeriana.tallernotasAOP.modelo.Estudiante;
import edu.javeriana.tallernotasAOP.modelo.Nota;
import edu.javeriana.tallernotasAOP.repositorio.RepositorioNota;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class ControladorNota {

    @Autowired
    private RepositorioNota repositorioNota;

    @GetMapping("/notas")
    public List<Nota> traerTodas() {
        return repositorioNota.findAll();
    }

    @GetMapping("/nota/{id}")
    public ResponseEntity<Nota> traeNota(@PathVariable Integer id)
    {
        Nota nota = repositorioNota.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe nota con id: " + id));

        return ResponseEntity.ok(nota);
    }

    @PostMapping("/nota/crea")
    public Nota creaNota(@RequestBody  Nota nota) {
        return repositorioNota.save(nota);
    }

    
    @DeleteMapping("/nota/borra/{id}")
    public ResponseEntity<HttpStatus> borraNota(@PathVariable Integer id) {
        Nota notaBorrar = repositorioNota.findById(id).orElseThrow(() -> new RegistroNoEncontradoException("No existe la nota con id: " + id));
        repositorioNota.delete(notaBorrar);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/nota/act/{id}")
    public Nota actualizaNota(@PathVariable Integer id, @RequestBody Nota notaAc) {
        Nota notaActualizada = repositorioNota.findById(id)
                .orElseThrow(() -> new RegistroNoEncontradoException("No existe la nota con el id: " + id));
        
        notaActualizada.setObservacion(notaAc.getObservacion());
        notaActualizada.setValor(notaAc.getValor());
        notaActualizada.setPorcentaje(notaAc.getPorcentaje());
    
        return  repositorioNota.save(notaActualizada);   //ResponseEntity.ok(nuevoEstudiante);
    }


}
