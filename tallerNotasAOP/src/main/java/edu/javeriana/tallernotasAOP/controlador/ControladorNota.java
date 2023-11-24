package edu.javeriana.tallernotasAOP.controlador;

import edu.javeriana.tallernotasAOP.modelo.Nota;
import edu.javeriana.tallernotasAOP.servicio.NotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/")
public class ControladorNota {

    @Autowired
    private NotaService notaService;

    @GetMapping("/notas")
    public List<Nota> traerTodas() {
        return notaService.traerTodas();
    }

    @GetMapping("/nota/{id}")
    public ResponseEntity<Nota> traeNota(@PathVariable Integer id) {
        return ResponseEntity.ok(notaService.traeNota(id));
    }

    @PostMapping("/nota/crea")
    public Nota creaNota(@RequestBody Nota nota) {
        return notaService.creaNota(nota);
    }

    @DeleteMapping("/nota/borra/{id}")
    public ResponseEntity<HttpStatus> borraNota(@PathVariable Integer id) {
        notaService.borraNota(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/nota/act/{id}")
    public Nota actualizaNota(@PathVariable Integer id, @RequestBody Nota notaAc) {
        return notaService.actualizaNota(id, notaAc);
    }
}
