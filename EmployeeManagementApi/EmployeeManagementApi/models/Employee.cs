namespace EmployeeManagementApi.models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}
