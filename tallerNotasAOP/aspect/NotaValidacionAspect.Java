package edu.javeriana.tallernotasAOP.aspect;

import edu.javeriana.tallernotasAOP.modelo.Nota;
import edu.javeriana.tallernotasAOP.repositorio.RepositorioNota;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Aspect
@Component
public class NotaValidacionAspect {
    @Autowired
    private RepositorioNota repositorioNota;

    @Before("execution(* edu.javeriana.tallernotasAOP.servicio.NotaService.crearNota(..)) || execution(* edu.javeriana.tallernotasAOP.servicio.NotaService.actualizarNota(..))")
    public void validarPorcentaje(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        Nota nota = (Nota) args[0];
        List<Nota> notas = repositorioNota.findAllByEstudianteId(nota.getEstudianteId());

        double totalPorcentaje = notas.stream().mapToDouble(Nota::getPorcentaje).sum();
        if (totalPorcentaje + nota.getPorcentaje() > 100) {
            throw new IllegalArgumentException("El total de porcentajes no puede superar el 100%");
        }
    }
}