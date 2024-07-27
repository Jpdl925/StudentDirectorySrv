using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StudentController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Students()
        {
            return Ok(await _context.Students.AsNoTracking().ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudents(Student student)
        {
            if (student is null)
            {
                return BadRequest();
            }

            await _context.Students.AddAsync(student);
            await _context.SaveChangesAsync();

            return Ok(student);
        }

        [HttpGet("{id}")]

        public async Task<IActionResult> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student is null)
            {
                return NotFound();
            }
            return Ok(student);
        }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
            if (id == 0)
            {
                return BadRequest();
            }
            _context.Entry(student).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student is null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return Ok(student);


        }
    }
}